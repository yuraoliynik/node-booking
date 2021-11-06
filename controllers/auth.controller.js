const {errorStatuses} = require('../constants');
const {OAuth} = require('../models');
const {jwtService} = require('../services');

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
    }
};
