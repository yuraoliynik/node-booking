const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {
    NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASS
} = require('../configs/config');

const {
    errorMessages,
    errorStatuses
} = require('../constants');

const {ErrorHandler} = require('../classes');
const allTemplates = require('../email-templates');

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLAY_EMAIL,
        pass: NO_REPLAY_EMAIL_PASS
    },
});

const sendMail = async (userEmail, emailAction, context = {}) => {
    const emailInfo = allTemplates[emailAction];

    if (!emailInfo) {
        throw new ErrorHandler(
            errorMessages.WRONG_TEMPLATE_NAME,
            errorStatuses.code_404
        );
    }

    const html = await emailTemplates.render(emailInfo.templateName, context);

    return transporter.sendMail({
        from: 'No replay',
        to: userEmail,
        subject: emailInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
