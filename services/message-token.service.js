const {
    errorMessages,
    errorStatuses
} = require('../constants');
const {ErrorHandler} = require('../classes');

const messageTokenLength = 6;

const generateMessageToken = (messageTokenType) => {
    const token = Math
        .random()
        .toString()
        .substring(2, messageTokenLength + 1);

    const tokenSum = [...token].reduce(
        (sum, currentItem) => Number(sum) + Number(currentItem)
    );

    const tokenControlSum = [...tokenSum.toString()].reduce(
        (sum, currentItem) => Number(sum) + Number(currentItem)
    );

    const messageToken =`${token}${tokenControlSum}`;

    return {
        token: messageToken,
        type: messageTokenType
    };
};

const verifyMessageToken = (messageToken) => {
    const tokenControlSum = messageToken.substring(messageToken.length - 1);

    const token = messageToken.substring(0, messageToken.length - 1);

    const verifyTokenSum = [...token].reduce(
        (sum, currentItem) => Number(sum) + Number(currentItem)
    );

    const verifyTokenControlSum = [...verifyTokenSum.toString()].reduce(
        (sum, currentItem) => Number(sum) + Number(currentItem)
    );

    if (verifyTokenControlSum !== tokenControlSum) {
        throw new ErrorHandler(
            errorMessages.INVALID_MESSAGE_TOKEN,
            errorStatuses.code_401
        );
    }
};

module.exports = {
    generateMessageToken,
    verifyMessageToken
};
