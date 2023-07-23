const sendResponse = require('../../utils/sendResponse').response;
const createAuditTrailRecord = require('../../utils/createAuditTrailRecord').createAuditTrailRecord;
const Trip = require('../../models').trip;
const Patient = require('../../models').patient;
const Validations = require('../../utils/validations');
const { Op, literal } = require('sequelize');
const { sendMessage, sendNotification } = require('../../utils/fireStoreHelper');

module.exports = async (req, res) => {
    try {
        const runNo = req.params.runNo;
        const { patient, message } = req.body;
        const validation = Validations.fieldsRequiredValidation([message, patient], ['message', 'patient']);
        if (validation.message) {
            throw {
                statusCode: 400,
                message: validation.message
            };
        }

        const patientValidation = Validations.fieldsRequiredValidation(
            [patient.name, patient.mrn, patient.dob, patient.patientGender,
                patient.pickupLocation, patient.pickupDateTime, patient.destinationAddress]
            , ['name', 'mrn', 'dob', 'gender', 'pickupLocation', 'pickupDateTime', 'destinationAddress']);

        if (patientValidation.message) {
            throw {
                statusCode: 400,
                message: `patient ${patientValidation.message}`
            };
        }

        const patientDataValidation = Validations.patientDataValidation(patient);
        for (const key in patientDataValidation) {
            if (!patientDataValidation[key]) {
                throw {
                    statusCode: 400,
                    message: `${MESSAGES.INVALID_DATA_FORMAT} ${key}.`
                };
            }
        }

        const data = {
            runNo,
            assigneeId: req.body.user.id,
            updateStatus: CONSTANTS.TRIP_STATUS.EXCEPTION
        };
        const [count, trip] = await Trip.update(
            {
                status: data.updateStatus,
                exceptionMessage: message,
                timeTaken: literal('EXTRACT(EPOCH FROM (NOW() - created_at)) / 60')
            },
            {
                where: {
                    runNo,
                    status: {
                        [Op.in]: [CONSTANTS.TRIP_STATUS.REVIEW, CONSTANTS.TRIP_STATUS.DATA_PROVIDED, CONSTANTS.TRIP_STATUS.MORE_INFO]
                    }
                },
                raw: true,
                returning: true
            }
        );
        if (count === 0) {
            throw {
                statusCode: 404,
                message: MESSAGES.TRIP_NOT_FOUND
            };
        }

        patient.tripRunNo = runNo;
        await Patient.upsert(patient);

        const approveMessage = {
            runNo,
            senderId: req.body.user.id,
            receiverId: trip[0].creatorId,
            status: CONSTANTS.TRIP_NOTIFICATION.APPROVED_WITH_EXCEPTION,
            subMessage: message
        };
        await sendMessage(approveMessage);
        await sendNotification(message);
        await createAuditTrailRecord({ data });
        sendResponse(res, null, null, MESSAGES.INITIAL_MESSAGE_TO_COMMENTS_SECTION);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};

