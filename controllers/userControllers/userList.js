const User = require('../../models').user;
const sendResponse = require('../../utils/sendResponse').response;
const { Op } = require('sequelize');

module.exports = async (req, res) => {
    try {
        const status = req.query.status;
        const roleId = req.query.role_id;
        let page = req.query.page || 1;

        page = parseInt(page);
        if (!page) {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_PAGE
            };
        }
        const limit = CONSTANTS.PAGINATION.LIMIT;
        const offset = (page - 1) * limit;

        if (roleId === undefined && status === undefined) {
            const data = await User.findAndCountAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'roleId', 'status'],
                where: {
                    [Op.or]: [{ roleId: 2 }, { roleId: 3 }]
                },
                order: [['updatedAt', 'DESC']],
                limit,
                offset
            });
            sendResponse(res, null, { data, limit }, null);
        } else if (status !== undefined && roleId === undefined) {
            const data = await User.findAndCountAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'roleId', 'status'],
                where: {
                    [Op.or]: [{ roleId: 2 }, { roleId: 3 }],
                    status
                },
                order: [['updatedAt', 'DESC']],
                limit,
                offset
            });
            sendResponse(res, null, { data, limit }, null);
        } else if (status === undefined && roleId !== undefined) {
            const data = await User.findAndCountAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'roleId', 'status'],
                where: {
                    roleId
                },
                order: [['updatedAt', 'DESC']],
                limit,
                offset
            });
            sendResponse(res, null, { data, limit }, null);
        } else {
            const data = await User.findAndCountAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'roleId', 'status'],
                where: {
                    roleId,
                    status
                },
                order: [['updatedAt', 'DESC']],
                limit,
                offset
            });
            sendResponse(res, null, { data, limit }, null);
        }
    } catch (error) {
        sendResponse(res, error, null, error.message, 400);
    }
};
