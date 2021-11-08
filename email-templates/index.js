const {emailActions} = require('../constants');

module.exports = {
    [emailActions.PASSWORD_WAS_CHANGE]: {
        templateName: 'password-was-change',
        subject: 'Your password on Booking was change!!!'
    },

    [emailActions.USER_ACTIVATION]: {
        templateName: 'user-activation',
        subject: 'Your account on Booking is active'
    },

    [emailActions.USER_FORGOT_PASSWORD]: {
        templateName: 'user-forgot-password',
        subject: 'Recreate your password on Booking'
    },

    [emailActions.USER_REGISTRATION]: {
        templateName: 'user-registration',
        subject: 'Hello on Booking!!!'
    }
};
