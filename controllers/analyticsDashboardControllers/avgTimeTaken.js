const moment = require('moment');
const Trip = require('../../models').trip;
const Sequelize = require('../../models/index').Sequelize;
const sendResponse = require('../../utils/sendResponse').response;
const { Op } = require('sequelize');
const Validation = require('./../../utils/validations');

module.exports = async (req, res) => {
    try {
        const startDateString = req.query.startDate || moment().startOf('day').toDate();
        const endDateString = req.query.endDate || moment().endOf('day').toDate();
        const { validate, startDate, endDate } = Validation.checkDateIntervalValidation(startDateString, endDateString);
        if (validate.message) {
            throw {
                statusCode: 400,
                message: validate.message
            };
        }
        const resData = await Trip.findAll({
            attributes: ['service_type', [Sequelize.fn('AVG', Sequelize.col('time_taken')), 'averageTimeTaken'],
                [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date']],
            where: {
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                },
                status: { [Op.in]: [CONSTANTS.TRIP_STATUS.APPROVED, CONSTANTS.TRIP_STATUS.EXCEPTION] }
            },
            group: ['date', 'service_type'],
            raw: true
        });
        const data = resData.reduce((acc, obj) => {
            if (!acc[obj.date]) {
                acc[obj.date] = [];
            }
            acc[obj.date].push({
                serviceType: obj.service_type,
                averageTimeTaken: parseFloat(obj.averageTimeTaken)
            });
            return acc;
        }, {});
        sendResponse(res, null, { data }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
