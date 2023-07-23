const sendResponse = require('../../utils/sendResponse').response;
const Trip = require('../../models').trip;
const User = require('../../models').user;

const userInclude = [{
    model: User,
    as: 'creator_data',
    attributes: ['first_name', 'last_name', 'fcm_token']
},
{
    model: User,
    as: 'assignee_data',
    attributes: ['first_name', 'last_name', 'fcm_token']
}];


module.exports = async (req, res) => {
    try {
        const runNo = req.params.runNo;
        const trip = await Trip.findOne({
            where: { runNo },
            include: userInclude,
            attributes: ['creatorId', 'assignee'],
            raw: true
        });
        if (!trip) {
            throw {
                statusCode: 404,
                message: MESSAGES.TRIP_NOT_FOUND
            };
        }
        const creatorInitial = trip['creator_data.first_name'] ?
            `${trip['creator_data.first_name'].charAt(0)}${trip['creator_data.last_name'].charAt(0)}` : null;
        const assigneeInitial = trip['assignee_data.first_name'] ?
            `${trip['assignee_data.first_name'].charAt(0)}${trip['assignee_data.last_name'].charAt(0)}` : null;
        const data = {
            creatorInitial,
            assigneeInitial,
            creatorId: trip.creatorId,
            assignee: trip.assignee,
            creatorFCMToken: trip['creator_data.fcm_token'],
            assigneeFCMToken: trip['assignee_data.fcm_token']
        };
        sendResponse(res, null, { data }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
