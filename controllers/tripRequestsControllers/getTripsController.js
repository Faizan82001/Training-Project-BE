const Trip = require('../../models').trip;
const sendResponse = require('../../utils/sendResponse').response;

module.exports = async (req, res) => {
    try {
        let trips;
        const roleId = req.body.user.roleId;
        if (roleId === 2) {
            trips = await Trip.findAll({
                attributes: ['runNo'],
                where: {
                    assignee: req.body.user.id
                },
                raw: true
            });
        } else {
            trips = await Trip.findAll({
                attributes: ['runNo'],
                where: {
                    creatorId: req.body.user.id
                },
                raw: true
            });
        }
        const runNoOfTrips = trips.map((trip) => trip.runNo.toString());
        sendResponse(res, null, { data: { runNoOfTrips, currentUser: req.body.user.id } }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
