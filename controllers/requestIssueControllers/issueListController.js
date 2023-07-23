const Issues = require('../../models').issues;
const sendResponse = require('../../utils/sendResponse').response;

module.exports = async (req, res) => {
    try {
        const data = await Issues.findAll({
            where: { nurseId: req.body.user.id },
            attributes: ['id', 'title', 'description'],
            order: [['created_at', 'DESC']]
        });
        sendResponse(res, null, { data }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
