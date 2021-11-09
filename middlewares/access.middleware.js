const {
    errorMessages,
    errorStatuses,
    userRoles,
    userStatuses
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

    checkPlaceEndpointPermissions: (endPointName) => (req, res, next) => {
        try {
            const {
                authorizedUser,
                foundPlace: {holder}
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

            const isThisOwner = endpointPermission.includes(userRoles.OWNER) && holder === _id;

            if (isThisOwner) {
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

    checkOrderEndpointPermissions: (endPointName) => (req, res, next) => {
        try {
            const {
                authorizedUser,
                foundOrder: {holder, guest}
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

            const isHolderOwner = endpointPermission.includes(userRoles.OWNER) && holder === _id;

            if (isHolderOwner) {
                return next();
            }

            const isGuestOwner = endpointPermission.includes(userRoles.OWNER) && guest === _id;

            if (isGuestOwner) {
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

    checkReviewEndpointPermissions: (endPointName) => (req, res, next) => {
        try {
            const {
                authorizedUser,
                foundReview: {holder, guest}
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

            const isHolderOwner = endpointPermission.includes(userRoles.OWNER) && holder === _id;

            if (isHolderOwner) {
                return next();
            }

            const isGuestOwner = endpointPermission.includes(userRoles.OWNER) && guest === _id;

            if (isGuestOwner) {
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

    checkUserStatus: (req, res, next) => {
        try {
            const {
                foundUser
            } = req;

            const userStatus = foundUser.status;

            if (userStatus === userStatuses.NOT_ACTIVE) {
                return next({
                    message: errorMessages.USER_IS_NOT_ACTIVATED,
                    status: errorStatuses.code_403
                });
            }

            if (userStatus === userStatuses.DEACTIVATED) {
                return next({
                    message: errorMessages.USER_IS_DEACTIVATED,
                    status: errorStatuses.code_403
                });
            }

            if (userStatus === userStatuses.BLOCKED) {
                return next({
                    message: errorMessages.USER_IS_BLOCKED,
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
