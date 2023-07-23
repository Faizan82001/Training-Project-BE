const moment = require('moment');
const Trip = require('../../models').trip;
const sendResponse = require('../../utils/sendResponse').response;
const Validation = require('./../../utils/validations');
const Sequelize = require('../../models/index').Sequelize;
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        const id = req.query.id;
        const { message } = Validation.fieldRequiredValidation(
            id,
            'id'
        );
        if (message) {
            throw {
                statusCode: 400,
                message
            };
        }
        const startDateString = req.query.startDate
            || moment().subtract(CONSTANTS.DURATION.DEFAULT_MONTHS, 'months').startOf('day').toDate();
        const endDateString = req.query.endDate || moment().endOf('day').toDate();
        const { validate, startDate, endDate } = Validation.checkDateIntervalValidation(startDateString, endDateString);
        if (validate.message) {
            throw {
                statusCode: 400,
                message: validate.message
            };
        }
        const { totalCount, data } = await getPerformanceCounterAnalytics(startDate, endDate, id);
        sendResponse(res, null, { totalCount, data }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};

const getPerformanceCounterAnalytics = async (startDate, endDate, id) => {
    const countData = await Trip.findAll({
        attributes: ['status',
            [Sequelize.fn('COUNT', Sequelize.col('run_no')), 'count']],
        where: {
            createdAt: {
                [Op.gte]: startDate,
                [Op.lte]: endDate
            },
            assignee: id
        },
        group: ['status']
    });
    const totalCount = countData.reduce((acc, item) => acc + parseInt(item.dataValues.count), 0);
    const data = countData.map((result) => ({
        status: result.status,
        count: parseInt(result.dataValues.count),
        percentage: parseFloat((result.dataValues.count / totalCount) * 100).toFixed(2)
    }));
    return { totalCount, data };
};
