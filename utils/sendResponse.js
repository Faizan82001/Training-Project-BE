const MESSAGES = require('../utils/messages');

exports.response = (res, error, data, message, successStatusCode = null) => {
    let responseObject;
    if (error) {
        if (error.statusCode && typeof error === 'object') {
            res.status(error.statusCode).send({ message });
        } else {
            res.status(500).send({ message: MESSAGES.SERVER_ERROR_MSG });
        }
    } else if (successStatusCode) {
        responseObject = message ? { message, ...data } : { ...data };
        res.status(successStatusCode).send(responseObject);
    } else {
        responseObject = message ? { message, ...data } : { ...data };
        res.status(200).send(responseObject);
    }
};
