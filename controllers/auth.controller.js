const {HOST_URL} = require('../configs/config');

const {
    actionTokenTypes,
    emailActions,
    errorStatuses,
    userStatuses
} = require('../constants');

const {
    ActionToken,
    OAuth,
    User
} = require('../models');

const {
    emailService,
    jwtService,
    passwordService
} = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {foundUser, foundUser: {_id}} = req;

            const oAuthTokens = jwtService.generateOAuthTokens();

            await OAuth.create({
                ...oAuthTokens,
                user: _id
            });

            res.json({
                user: foundUser,
                ...oAuthTokens
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {foundUser: {_id}} = req;

            await OAuth.deleteOne({user: _id});

            res
                .sendStatus(errorStatuses.code_205);
        } catch (err) {
            next(err);
        }
    },

    activateUserByEmail: async (req, res, next) => {
        try {
            const {foundUser: {_id, name, email}} = req;

            await User.updateOne(
                {_id},
                {status: userStatuses.ACTIVE}
            );

            await emailService.sendMail(
                email,
                emailActions.USER_ACTIVATION,
                {userName: name}
            );

            res
                .sendStatus(errorStatuses.code_201);
        } catch (err) {
            next(err);
        }
    },

    activateUserByPhone: async (req, res, next) => {
        try {
            const {foundUser: {_id}} = req;

            await User.updateOne(
                {_id},
                {status: userStatuses.ACTIVE}
            );

            res
                .sendStatus(errorStatuses.code_201);
        } catch (err) {
            next(err);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {authorizedUser, authorizedUser: {_id}} = req;

            const oAuthTokens = jwtService.generateOAuthTokens();

            await OAuth.create({
                ...oAuthTokens,
                user: _id
            });

            res
                .status(errorStatuses.code_201)
                .json({
                    user: authorizedUser,
                    ...oAuthTokens
                });
        } catch (e) {
            next(e);
        }
    },

    forgotPasswordByEmail: async (req, res, next) => {
        try {
            const {foundUser: {_id, name, email}} = req;

            const actionToken = await jwtService.generateActionToken(actionTokenTypes.FORGOT_PASSWORD);
            await ActionToken.create({
                ...actionToken,
                user: _id
            });

            const linkForgotPassword = `${HOST_URL}/auth/forgot-password/${actionToken.token}`;
            await emailService.sendMail(
                email,
                emailActions.USER_FORGOT_PASSWORD,
                {
                    userName: name,
                    link: linkForgotPassword
                }
            );

            res
                .sendStatus(errorStatuses.code_201);
        } catch (err) {
            next(err);
        }
    },

    changePasswordByEmail: async (req, res, next) => {
        try {
            const {
                body: {new_password},
                foundUser: {_id, name, email}
            } = req;

            await OAuth.deleteMany({user: _id});

            const hashPassword = await passwordService.hash(new_password);

            await User.updateOne(
                {_id},
                {password: hashPassword}
            );

            await emailService.sendMail(
                email,
                emailActions.PASSWORD_WAS_CHANGE,
                {userName: name}
            );

            res
                .sendStatus(errorStatuses.code_201);
        } catch (err) {
            next(err);
        }
    }
};
