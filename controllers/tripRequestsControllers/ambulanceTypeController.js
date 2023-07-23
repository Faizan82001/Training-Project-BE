const sendResponse = require('../../utils/sendResponse').response;

module.exports = (req, res) => {
    const types = CONSTANTS.AMBULANCE_TYPE;
    const data = Object.keys(types).map((key) => types[key]);
    sendResponse(res, null, { data }, null);
};
