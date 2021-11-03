const {
    errorMessages,
    errorStatuses
} = require('../constants');
const {User} = require('../models');

module.exports = {
    isPhoneOrEmailExist: async (req, res, next) => {
        try {
            const {body: {phone_number, email}} = req;

            const foundUser = await User.findOne({
                $or: [
                    {phone_number},
                    {email}
                ]
            }).lean();

            if (foundUser) {
                return next({
                    message: errorMessages.USER_PHONE_OR_EMAIL_ALREADY_EXISTS,
                    status: errorStatuses.code_409
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
