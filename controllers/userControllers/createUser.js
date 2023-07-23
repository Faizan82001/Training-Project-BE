const User = require('../../models').user;
const Validation = require('../../utils/validations');
const sendResponse = require('../../utils/sendResponse').response;
const emailSender = require('../../utils/emailSender');
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const { firstName, lastName, email, roleId } = req.body;
        const emailValidation = Validation.emailValidation(email);
        const firstNameValidation = Validation.fieldRequiredValidation(
            firstName,
            'firstName'
        );
        const lastNameValidation = Validation.fieldRequiredValidation(
            lastName,
            'lastName'
        );
        const roleIdValidation = Validation.fieldRequiredValidation(
            roleId,
            'roleId'
        );

        if (emailValidation.message) {
            throw {
                statusCode: 400,
                message: emailValidation.message
            };
        } else if (firstNameValidation.message) {
            throw {
                statusCode: 400,
                message: firstNameValidation.message
            };
        } else if (lastNameValidation.message) {
            throw {
                statusCode: 400,
                message: lastNameValidation.message
            };
        } else if (roleIdValidation.message) {
            throw {
                statusCode: 400,
                message: roleIdValidation.message
            };
        } else {
            const user = await User.findOne({
                where: {
                    email
                }
            });

            if (user) {
                throw {
                    statusCode: 400,
                    message: MESSAGES.USER_ALREADY_EXISTS
                };
            }

            const token = crypto.randomBytes(32).toString('hex');
            const data = {
                email,
                dynamic_template_data: {
                    subject: 'Set a new password for your Medical Data account',
                    first_name: firstName,
                    password_reset_link: `${process.env.FRONT_ENDPOINT}/set-password/${token}`
                }
            };

            await emailSender.sendEmail(
                data,
                CONSTANTS.EMAIL_TEMPLATE.LOCAL.SET_PASSWORD
            );

            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);

            await User.create({
                firstName,
                lastName,
                roleId,
                token,
                expiryDate,
                email: email.toLowerCase()
            });
            sendResponse(res, null, null, MESSAGES.REGISTER_SUCCESS_MSG);
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
