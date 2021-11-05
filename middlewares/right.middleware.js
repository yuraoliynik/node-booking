const {
    errorMessages,
    errorStatuses
} = require('../constants');

module.exports = {
    ifUserRole: (arrayUserRoles = []) => (req, res, next) => {
        try {
            const {foundUser: {role}} = req;

            if (!arrayUserRoles.include(role)) {
                return next({
                    message: errorMessages.ACCESS_DENIED,
                    status: errorStatuses.code_403
                });
            }

            req.checkedUserRole = role;

            next();
        } catch (e) {
            next(e);
        }
    },

    ifOwnUserId: (req, res, next) => {
        try {
            const {
                params: {userId},
                foundUser: {_id},
                checkedUserRole
            } = req;

            if (checkedUserRole) {
                return next();
            }

            if (userId !== _id.toString()) {
                return next({
                    message: errorMessages.ACCESS_DENIED,
                    status: errorStatuses.code_403
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
