const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').user;
const Validation = require('../utils/validations');
const cryptoJS = require('crypto-js');
const crypto = require('crypto');
const sendResponse = require('../utils/sendResponse').response;
const sendEmail = require('../utils/emailSender').sendEmail;

exports.login = async (req, res) => {
    try {
        const { email, password, fcmToken } = req.body;

        const decryptedPassword = cryptoJS.AES.decrypt(
            password,
            process.env.PSW_ENCRYPT_KEY
        ).toString(cryptoJS.enc.Utf8);

        const emailValidation = Validation.emailValidation(email);
        const passwordValidation = Validation.passwordValidation(decryptedPassword);

        if (emailValidation.message) {
            throw {
                statusCode: 400,
                message: emailValidation.message
            };
        } else if (passwordValidation.message) {
            throw {
                statusCode: 400,
                message: passwordValidation.message
            };
        } else {
            const user = await User.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                throw {
                    statusCode: 401,
                    message: MESSAGES.LOGIN_ERROR_MSG
                };
            }

            if (user.status === 'inactive') {
                throw {
                    statusCode: 403,
                    message: MESSAGES.INACTIVE_MSG
                };
            }

            if (user.status === 'invited') {
                throw {
                    statusCode: 403,
                    message: MESSAGES.INVITED_MSG
                };
            }

            const isMatch = await bcrypt.compare(decryptedPassword, user.password);

            if (!isMatch) {
                throw {
                    statusCode: 401,
                    message: MESSAGES.LOGIN_ERROR_MSG
                };
            }

            const token = jwt.sign(
                { id: user.id, roleId: user.roleId, email: user.email },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            if (fcmToken && (user.roleId === CONSTANTS.ROLE.BILLING_ADMIN || user.roleId === CONSTANTS.ROLE.NURSE)) {
                await User.update({ fcmToken }, { where: { id: user.id } });
            }
            const data = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                roleId: user.roleId
            };

            sendResponse(res, null, { data, token }, MESSAGES.LOGIN_SUCCESS_MSG);
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findByPk(req.body.user.id);

        let fieldValidation = Validation.fieldRequiredValidation(
            oldPassword,
            'oldPassword'
        );
        if (fieldValidation.message) {
            throw {
                statusCode: 400,
                message: fieldValidation.message
            };
        }
        fieldValidation = Validation.fieldRequiredValidation(
            newPassword,
            'newPassword'
        );
        if (fieldValidation.message) {
            throw {
                statusCode: 400,
                message: fieldValidation.message
            };
        }
        fieldValidation = Validation.fieldRequiredValidation(
            confirmPassword,
            'confirmPassword'
        );
        if (fieldValidation.message) {
            throw {
                statusCode: 400,
                message: fieldValidation.message
            };
        }

        const decryptedOldPassword = cryptoJS.AES.decrypt(
            oldPassword,
            process.env.PSW_ENCRYPT_KEY
        ).toString(cryptoJS.enc.Utf8);
        const decryptedNewPassword = cryptoJS.AES.decrypt(
            newPassword,
            process.env.PSW_ENCRYPT_KEY
        ).toString(cryptoJS.enc.Utf8);
        const decryptedConfirmPassword = cryptoJS.AES.decrypt(
            confirmPassword,
            process.env.PSW_ENCRYPT_KEY
        ).toString(cryptoJS.enc.Utf8);

        const oldPasswordValidation = Validation.fieldRequiredValidation(
            decryptedOldPassword,
            'oldPassword'
        );
        if (oldPasswordValidation.message) {
            throw {
                statusCode: 400,
                message: oldPasswordValidation.message
            };
        }

        const isMatch = await bcrypt.compare(decryptedOldPassword, user.password);

        if (isMatch) {
            const passwordValidation =
        Validation.passwordValidation(decryptedNewPassword);
            const confirmPasswordValidation = Validation.confirmPasswordValidation(
                decryptedNewPassword,
                decryptedConfirmPassword
            );

            if (passwordValidation.message) {
                throw {
                    statusCode: 400,
                    message: passwordValidation.message
                };
            } else if (confirmPasswordValidation.message) {
                throw {
                    statusCode: 400,
                    message: confirmPasswordValidation.message
                };
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(decryptedNewPassword, salt);
                await User.update(
                    {
                        password: hashedPassword
                    },
                    {
                        where: {
                            id: user.id
                        }
                    }
                );
                sendResponse(res, null, null, MESSAGES.CHANGE_PASSWORD_SUCCESS_MSG);
            }
        } else {
            throw {
                statusCode: 400,
                message: MESSAGES.INCORRECT_PASSWORD
            };
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const emailValidation = Validation.emailValidation(email);

        if (emailValidation.message) {
            throw {
                statusCode: 400,
                message: emailValidation.message
            };
        }

        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            throw {
                statusCode: 404,
                message: MESSAGES.USER_NOT_FOUND
            };
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);

        const data = {
            email,
            dynamic_template_data: {
                subject: 'Set a new password for your Medical Data account',
                first_name: user.firstName,
                password_reset_link: `${process.env.FRONT_ENDPOINT}/set-password/${token}`
            }
        };

        await sendEmail(
            data,
            CONSTANTS.EMAIL_TEMPLATE.LOCAL.SET_PASSWORD
        );
        await User.update(
            {
                token,
                expiryDate
            },
            {
                where: {
                    id: user.id
                }
            }
        );
        sendResponse(res, null, null, MESSAGES.FORGOT_PASSWORD_SUCCESS_MSG);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};

exports.setPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({ where: { token } });

        if (!user) {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_TOKEN
            };
        }

        if (user.expiryDate < Date.now()) {
            await User.update(
                { token: null, expiryDate: null },
                { where: { id: user.id } }
            );
            throw {
                statusCode: 400,
                message: MESSAGES.EXPIRED_TOKEN
            };
        } else {
            const { password, confirmPassword } = req.body;

            let fieldValidation = Validation.fieldRequiredValidation(
                password,
                'password'
            );
            if (fieldValidation.message) {
                throw {
                    statusCode: 400,
                    message: fieldValidation.message
                };
            }
            fieldValidation = Validation.fieldRequiredValidation(
                confirmPassword,
                'confirmPassword'
            );
            if (fieldValidation.message) {
                throw {
                    statusCode: 400,
                    message: fieldValidation.message
                };
            }

            const decryptedPassword = cryptoJS.AES.decrypt(
                password,
                process.env.PSW_ENCRYPT_KEY
            ).toString(cryptoJS.enc.Utf8);
            const decryptedConfirmPassword = cryptoJS.AES.decrypt(
                confirmPassword,
                process.env.PSW_ENCRYPT_KEY
            ).toString(cryptoJS.enc.Utf8);

            const passwordValidation =
        Validation.passwordValidation(decryptedPassword);
            const confirmPasswordValidation = Validation.confirmPasswordValidation(
                decryptedPassword,
                decryptedConfirmPassword
            );

            if (passwordValidation.message) {
                throw {
                    statusCode: 400,
                    message: passwordValidation.message
                };
            } else if (confirmPasswordValidation.message) {
                throw {
                    statusCode: 400,
                    message: confirmPasswordValidation.message
                };
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(decryptedPassword, salt);

                user.status = user.status === 'invited' ? 'active' : user.status;

                await User.update(
                    {
                        password: hashedPassword,
                        status: user.status,
                        token: null,
                        expiryDate: null
                    },
                    {
                        where: {
                            id: user.id
                        }
                    }
                );
                sendResponse(res, null, null, MESSAGES.CHANGE_PASSWORD_SUCCESS_MSG);
            }
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};

exports.logOutUser = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];

        if (token) {
            const loginUserData = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
            await User.update(
                { fcmToken: null },
                {
                    where: {
                        id: loginUserData.id
                    }
                }
            );
            sendResponse(res, null, null, MESSAGES.LOGGED_OUT);
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

exports.setFCMToken = async (req, res) => {
    try {
        const { fcmToken } = req.body;
        const loginUserData = req.body.user;
        await User.update(
            { fcmToken },
            {
                where: {
                    id: loginUserData.id
                }
            }
        );
        sendResponse(res, null, null, MESSAGES.FCM_TOKEN_SUCCESS_MSG);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
