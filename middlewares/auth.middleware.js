const {
    errorMessages,
    errorStatuses,
    headerNames,
    tokenTypes
} = require('../constants');

const {
    OAuth,
    User
} = require('../models');

const {jwtService} = require('../services');

module.exports = {
    checkPhoneOrEmail: async (req, res, next) => {
        try {
            const {body: {phone_number, email}} = req;

            const foundUser = await User
                .findOne({
                    $or: [
                        {phone_number},
                        {email}
                    ]
                })
                .lean();

            if (!foundUser) {
                return next({
                    message: errorMessages.WRONG_DATA_FOR_LOGIN,
                    status: errorStatuses.code_400
                });
            }

            req.foundUser = foundUser;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(headerNames.AUTHORIZATION);

            if (!token) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            jwtService.verifyToken(token, tokenTypes.ACCESS);

            const foundOAuth = await OAuth
                .findOne({access_token: token})
                .populate({path: 'user', lean: true})
                .lean();

            if (!foundOAuth) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            req.authorizedUser = foundOAuth.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(headerNames.AUTHORIZATION);

            if (!token) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            jwtService.verifyToken(token, tokenTypes.REFRESH);

            const foundOAuth = await OAuth
                .findOne({refresh_token: token})
                .populate({path: 'user', lean: true})
                .lean();

            if (!foundOAuth) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            await OAuth.deleteOne({
                refresh_token: token
            });

            req.authorizedUser = foundOAuth.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
