const {
    errorMessages,
    errorStatuses,
    headerNames,
    messageTokenTypes,
    tokenTypes
} = require('../constants');

const {
    ActionToken,
    OAuth,
    User
} = require('../models');

const {
    jwtService,
    messageTokenService,
    passwordService
} = require('../services');

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

    checkPassword: async (req, res, next) => {
        try {
            const {body, foundUser} = req;

            const {password: hashPassword} = await User
                .findById(foundUser._id)
                .select('+password');

            await passwordService.compare(body.password, hashPassword);

            next();
        } catch (err) {
            next(err);
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
    },

    checkActionToken: (actionTokenType) => async (req, res, next) => {
        try {
            const token = req.get(headerNames.AUTHORIZATION);

            if (!token) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            jwtService.verifyToken(token, actionTokenType);

            const foundActionToken = await ActionToken
                .findOne({token})
                .populate({path: 'user', lean: true})
                .lean();

            if (!foundActionToken) {
                return next({
                    message: errorMessages.INVALID_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            await ActionToken.deleteOne({token});

            req.foundUser = foundActionToken.user;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkMessageToken: async (req, res, next) => {
        try {
            const token = req.get(headerNames.AUTHORIZATION);
            const {body: {phone_number}} = req;

            if (!token) {
                return next({
                    message: errorMessages.INVALID_MESSAGE_TOKEN,
                    status: errorStatuses.code_401
                });
            }

            req.foundUser = await messageTokenService.verifyMessageToken(
                phone_number,
                token,
                messageTokenTypes.ACTIVATE_USER
            );

            next();
        } catch (err) {
            next(err);
        }
    }
};
