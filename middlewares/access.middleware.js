const {
    errorMessages,
    errorStatuses,
    userRoles
} = require('../constants');

const {
    endpointPermissions,
    roleRights
} = require('../accesses');

module.exports = {
    checkEndpointPermissions: (endPointName) => (req, res, next) => {
        try {
            const {
                params: {userId},
                authorizedUser
            } = req;

            if (!endPointName) {
                return next({
                    message: errorMessages.WRONG_ENDPOINT_NAME,
                    status: errorStatuses.code_400
                });
            }

            const endpointPermission = endpointPermissions[endPointName];

            if (endpointPermission.includes(userRoles.ALL)) {
                return next();
            }

            const {_id, role} = authorizedUser;

            const isThisOwner = endpointPermission.includes(userRoles.OWNER) && userId === _id.toString();

            if (isThisOwner) {
                req.foundUser = authorizedUser;
                req.checkedOwner = true;

                return next();
            }

            if (!endpointPermission.includes(role)) {
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

    checkRoleRights: (req, res, next) => {
        try {
            const {
                authorizedUser,
                foundUser,
                checkedOwner
            } = req;

            if (checkedOwner) {
                return next();
            }

            const authorizedUserRights = roleRights[authorizedUser.role];

            if (!authorizedUserRights.includes(foundUser.role)) {
                return next({
                    message: errorMessages.ACCESS_DENIED,
                    status: errorStatuses.code_403
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
