const moment = require('moment');
const Trip = require('../../models').trip;
const sendResponse = require('../../utils/sendResponse').response;
const Validation = require('./../../utils/validations');
const Sequelize = require('../../models/index').Sequelize;
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        const date = {
            defaultStartDate: moment().subtract(CONSTANTS.DURATION.DEFAULT_MONTHS, 'months').startOf('day').toDate(),
            defaultEndDate: moment().endOf('day').toDate()
        };
        const startDateString = req.query.startDate || date.defaultStartDate;
        const endDateString = req.query.endDate || date.defaultEndDate;
        const { validate, startDate, endDate } = Validation.checkDateIntervalValidation(startDateString, endDateString);
        if (validate.message) {
            throw {
                statusCode: 400,
                message: validate.message
            };
        }
        const { totalCount, data } = await getTotalRequestsAnalytics(startDate, endDate);
        sendResponse(res, null, { totalCount, data }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};

const getTotalRequestsAnalytics = async (startDate, endDate) => {
    const groupData = await Trip.findAll({
        attributes: ['status',
            [Sequelize.fn('COUNT', Sequelize.col('run_no')), 'count']],
        where: {
            createdAt: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            }
        },
        group: ['status']
    });
    const totalCount = groupData.reduce((acc, item) => acc + parseInt(item.dataValues.count), 0);
    const data = groupData.map((result) => ({
        status: result.status,
        count: parseInt(result.dataValues.count),
        percentage: parseFloat((result.dataValues.count / totalCount) * 100).toFixed(2)
    }));
    return { totalCount, data };
};
