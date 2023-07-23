const Trip = require('../../models').trip;
const Patient = require('../../models').patient;
const sendResponse = require('../../utils/sendResponse').response;
const createAuditTrailRecord = require('../../utils/createAuditTrailRecord').createAuditTrailRecord;
const { Op, literal } = require('sequelize');
const { sendMessage, sendNotification } = require('../../utils/fireStoreHelper');
const Validations = require('../../utils/validations');

module.exports = async (req, res) => {
    try {
        const request = req.query.runNo;
        if (!request) {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_REQUEST
            };
        }

        const loginUser = req.body.user;
        const patient = req.body.patient;
        const validation = Validations.fieldsRequiredValidation([patient], ['patient']);
        if (validation.message) {
            throw {
                statusCode: 400,
                message: validation.message
            };
        }

        let patientValidation = Validations.fieldsRequiredValidation(
            [patient.name, patient.mrn, patient.dob, patient.patientGender,
                patient.pickupLocation, patient.pickupDateTime, patient.destinationAddress]
            , ['name', 'mrn', 'dob', 'gender', 'pickupLocation', 'pickupDateTime', 'destinationAddress']);
        if (patientValidation.message) {
            throw {
                statusCode: 400,
                message: `patient ${patientValidation.message}`
            };
        }

        patientValidation = Validations.patientDataValidation(patient);
        for (const key in patientValidation) {
            if (!patientValidation[key]) {
                throw {
                    statusCode: 400,
                    message: `${MESSAGES.INVALID_DATA_FORMAT} ${key}.`
                };
            }
        }

        const [count, updateData] = await Trip.update({
            status: CONSTANTS.TRIP_STATUS.APPROVED,
            timeTaken: literal('EXTRACT(EPOCH FROM (NOW() - created_at)) / 60')
        },
        {
            where: {
                runNo: request,
                assignee: loginUser.id,
                status: { [Op.in]: [CONSTANTS.TRIP_STATUS.REVIEW, CONSTANTS.TRIP_STATUS.DATA_PROVIDED] }
            },
            returning: true,
            raw: true
        });
        if (count !== 0) {
            const auditTrailData = {
                runNo: request,
                assigneeId: loginUser.id,
                updateStatus: CONSTANTS.TRIP_STATUS.APPROVED
            };
            await createAuditTrailRecord({ data: auditTrailData });

            patient.tripRunNo = request;
            await Patient.upsert(patient);

            const message = {
                runNo: request,
                senderId: loginUser.id,
                receiverId: updateData[0].creatorId,
                status: CONSTANTS.TRIP_NOTIFICATION.APPROVED_REQUEST,
                subMessage: null
            };
            await sendMessage(message);
            await sendNotification(message);
            sendResponse(res, null, null, MESSAGES.APPROVED);
        } else {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_REQUEST
            };
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
