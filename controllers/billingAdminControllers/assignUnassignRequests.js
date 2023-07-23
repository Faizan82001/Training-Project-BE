const Trip = require('../../models').trip;
const sendResponse = require('../../utils/sendResponse').response;
const createAuditTrailRecord = require('../../utils/createAuditTrailRecord').createAuditTrailRecord;
const { sendMessage, searchNewMessage, sendNotification } = require('../../utils/fireStoreHelper');

module.exports = async (req, res) => {
    try {
        let updateData = {};
        let responseMessage = '';
        const assigneeId = req.body.user.id;
        const runNo = req.params.runNo;

        const data = await Trip.findOne({
            where: {
                runNo
            },
            raw: true
        });

        if (!data) {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_REQUEST
            };
        }

        const status = data.status;

        if (status === CONSTANTS.TRIP_STATUS.NEW && data.assignee === null) {
            updateData = { status: CONSTANTS.TRIP_STATUS.REVIEW, assignee: assigneeId };
            responseMessage = MESSAGES.ASSIGN_STATUS_UPDATE;

            if (!await searchNewMessage(runNo)) {
                const message = {
                    runNo,
                    senderId: data.creatorId,
                    receiverId: assigneeId,
                    status: CONSTANTS.TRIP_NOTIFICATION.NEW_REQUEST,
                    subMessage: null
                };
                await sendMessage(message);
            }

            const assignMessage = {
                runNo,
                senderId: assigneeId,
                receiverId: data.creatorId,
                status: CONSTANTS.TRIP_NOTIFICATION.ASSIGNED_REQUEST,
                subMessage: null
            };
            await sendMessage(assignMessage);
            await sendNotification(assignMessage);

        } else if (status === CONSTANTS.TRIP_STATUS.REVIEW && assigneeId === data.assignee) {
            updateData = { status: CONSTANTS.TRIP_STATUS.NEW, assignee: null };
            responseMessage = MESSAGES.UNASSIGN_STATUS_UPDATE;

            const message = {
                runNo,
                senderId: assigneeId,
                receiverId: data.creatorId,
                status: CONSTANTS.TRIP_NOTIFICATION.UNASSIGNED_REQUEST,
                subMessage: null
            };
            await sendMessage(message);
            await sendNotification(message);
        } else {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_REQUEST
            };
        }

        await Trip.update(
            updateData,
            {
                where: {
                    runNo
                }
            });

        const auditTrailData = {
            runNo,
            assigneeId: req.body.user.id,
            updateStatus: updateData.status === CONSTANTS.TRIP_STATUS.NEW
                ? CONSTANTS.TRIP_NOTIFICATION.UNASSIGNED_REQUEST
                : CONSTANTS.TRIP_STATUS.REVIEW
        };
        await createAuditTrailRecord({ data: auditTrailData });
        sendResponse(res, null, null, responseMessage);

    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
