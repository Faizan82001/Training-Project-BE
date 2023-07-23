const sendResponse = require('../utils/sendResponse').response;
const crypto = require('crypto');

exports.lamdaAuthentication = async (req, res, next) => {
    try {
        const lambdaHeader = req.headers['lambda-header'];
        const isMatched = (crypto.createHash('sha256').update(process.env.LAMBDA_AUTHORIZATION_KEY).digest('hex') === lambdaHeader);
        if (isMatched) {
            next();
        } else {
            throw {
                statusCode: 401,
                message: MESSAGES.INVALID_TOKEN
            };
        }
    } catch (err) {
        const error = {
            statusCode: 401,
            message: MESSAGES.INVALID_TOKEN
        };
        sendResponse(res, error, null, error.message);
    }
};
