const sendResponse = require('../../utils/sendResponse').response;
const User = require('../../models').user;
const Trip = require('../../models').trip;
const Document = require('../../models').document;
const Validation = require('../../utils/validations');
const createAuditTrailRecord = require('../../utils/createAuditTrailRecord').createAuditTrailRecord;
const { getDocStatus, sendNotification } = require('../../utils/fireStoreHelper');

module.exports = async (req, res) => {
    try {
        const { runNo, serviceType, user } = req.body;

        const validation = Validation.fieldsRequiredValidation([runNo, serviceType], ['runNo', 'serviceType']);

        if (validation.message) {
            throw {
                statusCode: 400,
                message: validation.message
            };
        }

        const documents = await Document.findByPk(runNo, { raw: true });
        if (!documents || !documents.faceSheet || !documents.pcs) {
            throw {
                statusCode: 400,
                message: MESSAGES.DOCUMENT_NOT_UPLOADED
            };
        }
        const docStatus = await getDocStatus(runNo);
        if (docStatus && (!docStatus.faceSheetOCR || !docStatus.pcsOCR)) {
            throw {
                statusCode: 400,
                message: `${MESSAGES.OCR_NOT_DONE}${!docStatus.faceSheetOCR ? 'faceSheet?' : 'pcs?'}`
            };
        }
        await Trip.create({
            runNo,
            serviceType,
            creatorId: user.id
        });

        const data = {
            runNo,
            assigneeId: req.body.user.id,
            updateStatus: CONSTANTS.TRIP_STATUS.NEW
        };
        await createAuditTrailRecord({ data });

        const billingAdmins = await User.findAll({
            attributes: ['id'],
            where: {
                roleId: CONSTANTS.ROLE.BILLING_ADMIN,
                status: CONSTANTS.STATUS.ACTIVE
            },
            raw: true
        });

        billingAdmins.forEach(async (admin) => {
            const notification = {
                receiverId: admin.id,
                status: CONSTANTS.TRIP_NOTIFICATION.NEW_REQUEST,
                runNo
            };
            await sendNotification(notification);
        });
        sendResponse(res, null, null, MESSAGES.TRIP_CREATED);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
