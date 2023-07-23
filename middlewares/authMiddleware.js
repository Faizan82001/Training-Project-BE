const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/sendResponse').response;
const User = require('../models').user;

exports.userAuthentication = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const token = authorization.split(' ')[1];

            if (token) {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                const status = await User.findOne({ attributes: ['status'], where: { id: user.id }, raw: true });
                if (status.status === CONSTANTS.STATUS.ACTIVE) {
                    req.body.user = user;
                    next();
                } else {
                    throw {
                        statusCode: 401,
                        message: MESSAGES.UNAUTHORIZED_USER
                    };
                }
            } else {
                throw {
                    statusCode: 401,
                    message: MESSAGES.INVALID_TOKEN
                };
            }
        } catch (error) {
            sendResponse(res, { statusCode: 401 },
                null, error.message === MESSAGES.UNAUTHORIZED_USER ? error.message : MESSAGES.INVALID_TOKEN);
        }
    };
};

exports.userAuthorization = (role) => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const token = authorization.split(' ')[1];

            if (token) {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                const status = await User.findOne({ attributes: ['status'], where: { id: user.id }, raw: true });
                if (user && role.includes(user.roleId) && status.status === CONSTANTS.STATUS.ACTIVE) {
                    req.body.user = user;
                    next();
                } else {
                    throw {
                        statusCode: 401,
                        message: MESSAGES.UNAUTHORIZED_USER
                    };
                }
            } else {
                throw {
                    statusCode: 401,
                    message: MESSAGES.INVALID_TOKEN
                };
            }
        } catch (error) {
            sendResponse(res, { statusCode: 401 },
                null, error.message === MESSAGES.UNAUTHORIZED_USER ? error.message : MESSAGES.INVALID_TOKEN);
        }
    };
};
