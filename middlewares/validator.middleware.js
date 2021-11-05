const {
    errorMessages,
    errorStatuses
} = require('../constants');

module.exports = {
    isBodyValidate: (validator, authKey = 0) => (req, res, next) => {
        try {
            const {body} = req;

            const {error} = validator.validate(body);

            if (error && authKey) {
                return next({
                    message: errorMessages.WRONG_DATA_FOR_LOGIN,
                    status: errorStatuses.code_400
                });
            }

            if (error) {
                return next({
                    message: error.details[0].message,
                    status: errorStatuses.code_400
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
