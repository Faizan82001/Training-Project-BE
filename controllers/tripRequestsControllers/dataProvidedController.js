const sendResponse = require('../../utils/sendResponse').response;
const Trip = require('../../models').trip;
const Document = require('../../models').document;
const { Op } = require('sequelize');
const createAuditTrailRecord = require('../../utils/createAuditTrailRecord').createAuditTrailRecord;
const { sendMessage, sendNotification } = require('../../utils/fireStoreHelper');

module.exports = async (req, res) => {
    try {
        const runNo = req.params.runNo;
        const documents = await Document.findByPk(runNo, { raw: true });
        if (!documents || !documents.faceSheet || !documents.pcs) {
            throw {
                statusCode: 400,
                message: MESSAGES.DOCUMENT_NOT_UPLOADED
            };
        }

        const [count, updatedData] = await Trip.update({
            status: CONSTANTS.TRIP_STATUS.DATA_PROVIDED
        },
        {
            where: {
                runNo,
                status: { [Op.in]: [CONSTANTS.TRIP_STATUS.MORE_INFO] }
            },
            returning: true,
            raw: true
        });
        const data = {
            runNo,
            assigneeId: req.body.user.id,
            updateStatus: CONSTANTS.TRIP_STATUS.DATA_PROVIDED
        };
        if (count !== 0) {
            await createAuditTrailRecord({ data });
            const message = {
                runNo,
                senderId: req.body.user.id,
                receiverId: updatedData[0].assignee,
                status: CONSTANTS.TRIP_NOTIFICATION.DATA_PROVIDED,
                subMessage: null
            };
            await sendMessage(message);
            await sendNotification(message);
            sendResponse(res, null, null, MESSAGES.TRIP_DATA_UPDATED);
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
