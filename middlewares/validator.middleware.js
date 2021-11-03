const {
    errorStatuses
} = require('../constants');

module.exports = {
    isBodyValidate: (validator) => (req, res, next) => {
        try {
            const {body} = req;

            const {error} = validator.validate(body);

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
