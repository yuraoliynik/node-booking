const {messageConfig} = require('../configs');

const {
    errorMessages,
    errorStatuses
} = require('../constants');
const {ErrorHandler} = require('../classes');
const {MessageToken} = require('../models');

const generateSimpleToken = () => {
    const token = Math
        .random()
        .toString()
        .substring(2, messageConfig.tokenLength + 1);

    const tokenSum = [...token].reduce(
        (sum, currentItem) => Number(sum) + Number(currentItem)
    );

    const tokenControlSum = [...tokenSum.toString()].reduce(
        (sum, currentItem) => Number(sum) + Number(currentItem)
    );

    const simpleToken =`${token}${tokenControlSum}`;

    return {simpleToken};
};

const verifySimpleToken = (messageToken) => {
    const tokenControlSum = Number(
        messageToken.substring(messageToken.length - 1)
    );

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

const createMessageToken = (userId, messageTokenType) => {
    const {simpleToken} = generateSimpleToken();

    return MessageToken.create({
        token: simpleToken,
        type: messageTokenType,
        user: userId
    });
};

const verifyMessageToken = async (userPhoneNumber, messageToken, messageTokenType) => {
    verifySimpleToken(messageToken);

    const foundMessageToken = await MessageToken.findOne({
        token: messageToken,
        type: messageTokenType
    })
        .populate({path: 'user', lean: true})
        .lean();

    if (!foundMessageToken) {
        throw new ErrorHandler(
            errorMessages.INVALID_MESSAGE_TOKEN,
            errorStatuses.code_401
        );
    }

    const {user: {phone_number}} = foundMessageToken;

    if (phone_number !== userPhoneNumber) {
        throw new ErrorHandler(
            errorMessages.INVALID_MESSAGE_TOKEN,
            errorStatuses.code_401
        );
    }

    const {_id, createdAt} = foundMessageToken;

    await MessageToken.deleteOne({_id});

    const messageTimeLimit = new Date(
        createdAt.getTime() + messageConfig.lifeTime * 1000
    );

    const currentDateTime = new Date();

    if (messageTimeLimit < currentDateTime) {
        throw new ErrorHandler(
            errorMessages.INVALID_MESSAGE_TOKEN,
            errorStatuses.code_401
        );
    }

    return foundMessageToken.user;
};

module.exports = {
    createMessageToken,
    verifyMessageToken
};
