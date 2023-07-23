const Issues = require('../../models').issues;
const Users = require('../../models').user;
const sendResponse = require('../../utils/sendResponse').response;
const emailSender = require('../../utils/emailSender');
const Validation = require('../../utils/validations');

module.exports = async (req, res) => {
    try {
        const nurseId = req.body.user.id;
        const email = CONSTANTS.EMAIL.ISSUE_REPORT;
        const { title, description } = req.body;

        const titleValidation = Validation.fieldRequiredValidation(
            title,
            'title'
        );
        const descriptionValidation = Validation.fieldRequiredValidation(
            description,
            'description'
        );

        if (titleValidation.message) {
            throw {
                statusCode: 400,
                message: titleValidation.message
            };
        }
        if (descriptionValidation.message) {
            throw {
                statusCode: 400,
                message: descriptionValidation.message
            };
        }

        const userData = await getUserData(nurseId);
        const data = {
            email,
            dynamic_template_data: {
                subject: 'Issues Reported by EMT Nurse',
                first_name: userData.firstName,
                last_name: userData.lastName,
                title,
                description
            }
        };
        await Issues.create({
            title,
            description,
            nurseId
        });
        await emailSender.sendEmail(
            data,
            CONSTANTS.EMAIL_TEMPLATE.LOCAL.REPORT_ISSUE
        );
        sendResponse(res, null, null, MESSAGES.REPORT_SUCCESS_MSG);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};

const getUserData = async (nurseId) => {
    return await Users.findOne({
        attributes: ['firstName', 'lastName'],
        where: {
            id: nurseId
        }
    });
};

