const User = require('../../models').user;
const sendResponse = require('../../utils/sendResponse').response;

module.exports = async (req, res) => {
    try {
        const billingAdminList = await User.findAll({
            attributes: ['id', 'email'],
            where: {
                roleId: 2,
                status: 'active'
            },
            order: [
                ['email', 'ASC']
            ]
        });
        sendResponse(res, null, { data: billingAdminList }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
