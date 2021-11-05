const {emailTemplates} = require('../constants');

module.exports = {
    [emailTemplates.USER_REGISTRATION]: {
        templateName: 'user-registration',
        subject: 'Hello on booking!!!'
    }
};
