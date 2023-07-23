const User = require('../../models').user;
const sendResponse = require('../../utils/sendResponse').response;
const emailSender = require('../../utils/emailSender');
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = await User.findOne({
            where: {
                id: userId
            }
        });
        if (!userData) {
            throw {
                statusCode: 404,
                message: MESSAGES.USER_NOT_FOUND
            };
        }

        const status = userData.status;
        let newStatus = '';
        if (status === 'active') {
            newStatus = 'inactive';
        } else if (status === 'inactive') {
            newStatus = 'active';
        } else {
            const token = crypto.randomBytes(32).toString('hex');
            const data = {
                email: userData.email,
                dynamic_template_data: {
                    subject: 'Set a new password for your Medical Data account',
                    first_name: userData.firstName,
                    password_reset_link: `${process.env.FRONT_ENDPOINT}/set-password/${token}`
                }
            };
            await emailSender.sendEmail(
                data,
                CONSTANTS.EMAIL_TEMPLATE.LOCAL.SET_PASSWORD
            );
            sendResponse(res, null, null, MESSAGES.INVITED_AGAIN_MSG);
            return;
        }
        await User.update({ status: newStatus }, {
            where: { id: userId }
        });
        sendResponse(res, null, null, MESSAGES.UPDATE_USER_STATUS);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
