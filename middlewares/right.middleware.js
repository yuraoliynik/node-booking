const {
    errorMessages,
    errorStatuses
} = require('../constants');

module.exports = {
    checkOwner: (req, res, next) => {
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

            req.checkedOwner = true;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRankUserRole: (req, res, next) => {
        try {
            const {
                params: {userId},
                foundUser: {_id}
            } = req;

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

    checkUserRole: (arrayUserRoles = []) => (req, res, next) => {
        try {
            const {foundUser: {role}} = req;

            if (!arrayUserRoles.include(role)) {
                return next({
                    message: errorMessages.ACCESS_DENIED,
                    status: errorStatuses.code_403
                });
            }

            req.checkedUserRole = true;

            next();
        } catch (e) {
            next(e);
        }
    }
};
