const jwt = require('jsonwebtoken');

const {
    JWT_SECRET_WORD_ACCESS,
    JWT_SECRET_WORD_REFRESH,

    JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT,
    JWT_SECRET_WORD_ACTION_FORGOT_PASSWORD
} = require('../configs/config');

const {
    actionTokenTypes,
    errorMessages,
    errorStatuses,
    tokenTypes
} = require('../constants');

const {ErrorHandler} = require('../classes');

module.exports = {
    generateActionToken: (actionTokenType) => {
        let actionSecretWord;

        switch (actionTokenType) {
            case actionTokenTypes.ACTIVATE_ACCOUNT:
                actionSecretWord = JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT;
                break;

            case actionTokenTypes.FORGOT_PASSWORD:
                actionSecretWord = JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT;
                break;

            default:
                throw new ErrorHandler(
                    errorMessages.WRONG_TOKEN_TYPE,
                    errorStatuses.code_404
                );
        }

        const actionToken = jwt.sign({}, actionSecretWord, {expiresIn: '24hours'});

        return {
            token: actionToken,
            type: actionTokenType
        };
    },

    generateOAuthTokens: () => {
        const access_token = jwt.sign({}, JWT_SECRET_WORD_ACCESS, {expiresIn: '15minutes'});
        const refresh_token = jwt.sign({}, JWT_SECRET_WORD_REFRESH, {expiresIn: '30days'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: (token, tokenType = tokenTypes.ACCESS) => {
        try {
            let secretWord;

            switch (tokenType) {
                case tokenTypes.ACCESS:
                    secretWord = JWT_SECRET_WORD_ACCESS;
                    break;

                case tokenTypes.REFRESH:
                    secretWord = JWT_SECRET_WORD_REFRESH;
                    break;

                case actionTokenTypes.ACTIVATE_ACCOUNT:
                    secretWord = JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT;
                    break;

                case actionTokenTypes.FORGOT_PASSWORD:
                    secretWord = JWT_SECRET_WORD_ACTION_FORGOT_PASSWORD;
                    break;
            }

            return jwt.verify(token, secretWord);
        } catch (e) {
            throw new ErrorHandler(
                errorMessages.INVALID_TOKEN,
                errorStatuses.code_401
            );
        }
    }
};
