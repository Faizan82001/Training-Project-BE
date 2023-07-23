const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (data, templateId) => {
    try {
        const msg = {
            templateId,
            to: data.email,
            from: CONSTANTS.EMAIL.LOCAL,
            subject: data.subject,
            dynamic_template_data: data.dynamic_template_data
        };

        await sgMail.send(msg);
    } catch (error) {
        // No Action Here.
    }
};
