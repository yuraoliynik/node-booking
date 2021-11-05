const jwt = require('jsonwebtoken');

const {
    JWT_SECRET_WORD_ACCESS,
    JWT_SECRET_WORD_REFRESH
} = require('../configs/config');
const {
    errorMessages,
    errorStatuses,
    tokenTypes
} = require('../constants');
const {ErrorHandler} = require('../classes');

module.exports = {
    generateOAuthTokens: () => {
        const access_token = jwt.sign({}, JWT_SECRET_WORD_ACCESS, {expiresIn: '15minutes'});
        const refresh_token = jwt.sign({}, JWT_SECRET_WORD_REFRESH, {expiresIn: '30days'});

        return {
            access_token,
            refresh_token
        };
    },

    validate: (token, tokenType = tokenTypes.ACCESS) => {
        try {
            let secretWord;

            switch (tokenType) {
                case tokenTypes.ACCESS:
                    secretWord = JWT_SECRET_WORD_ACCESS;
                    break;

                case tokenTypes.REFRESH:
                    secretWord = JWT_SECRET_WORD_REFRESH;
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
