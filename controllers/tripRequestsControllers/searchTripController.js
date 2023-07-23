const sendResponse = require('../../utils/sendResponse').response;
const Trip = require('../../models').trip;
const User = require('../../models').user;
const { setDocStatus } = require('../../utils/fireStoreHelper');

module.exports = async (req, res) => {
    try {
        const runNo = req.params.runNo;
        const trip = await Trip.findOne({ where: { runNo }, raw: true });

        if (!trip) {
            await setDocStatus(runNo, req.body.user.id);
            throw {
                statusCode: 404,
                message: MESSAGES.DATA_NOT_FOUND
            };
        }

        const nurseName = await User.findOne({
            where: { id: trip.creatorId },
            attributes: [
                [
                    Trip.sequelize.fn(
                        'CONCAT',
                        Trip.sequelize.col('first_name'),
                        ' ',
                        Trip.sequelize.col('last_name')
                    ),
                    'nurseName'
                ]
            ],
            raw: true
        });

        const assigneeName = trip.assignee
            ? await User.findOne({
                where: { id: trip.assignee },
                attributes: [
                    [
                        Trip.sequelize.fn(
                            'CONCAT',
                            Trip.sequelize.col('first_name'),
                            ' ',
                            Trip.sequelize.col('last_name')
                        ),
                        'assigneeName'
                    ]
                ],
                raw: true
            })
            : null;

        const data = {
            ...trip,
            nurseName: nurseName.nurseName,
            assigneeName
        };
        sendResponse(res, null, { data }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
