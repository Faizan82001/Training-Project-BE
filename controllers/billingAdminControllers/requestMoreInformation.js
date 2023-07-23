const Trip = require('../../models').trip;
const sendResponse = require('../../utils/sendResponse').response;
const createAuditTrailRecord = require('../../utils/createAuditTrailRecord').createAuditTrailRecord;
const { sendMessage, sendNotification } = require('../../utils/fireStoreHelper');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        const runNo = req.params.runNo;
        const message = req.body.message;
        const data = {
            runNo,
            assigneeId: req.body.user.id,
            updateStatus: CONSTANTS.TRIP_STATUS.MORE_INFO
        };
        const [count, trip] = await Trip.update(
            { status: data.updateStatus, exceptionMessage: null },
            {
                where: {
                    runNo,
                    status: {
                        [Op.in]: [CONSTANTS.TRIP_STATUS.REVIEW, CONSTANTS.TRIP_STATUS.DATA_PROVIDED]
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
        await createAuditTrailRecord({ data });
        const reqInfoMessage = {
            runNo,
            senderId: data.assigneeId,
            receiverId: trip[0].creatorId,
            status: CONSTANTS.TRIP_NOTIFICATION.REQUEST_MORE_INFO,
            subMessage: message
        };
        await sendMessage(reqInfoMessage);
        await sendNotification(reqInfoMessage);
        sendResponse(res, null, null, MESSAGES.INITIAL_MESSAGE_TO_COMMENTS_SECTION);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
