const bcrypt = require('bcrypt');

const {
    errorMessages,
    errorStatuses
} = require('../constants');
const {ErrorHandler} = require('../classes');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(
                errorMessages.WRONG_DATA_FOR_LOGIN,
                errorStatuses.code_400
            );
        }
    }
};
