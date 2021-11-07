const {
    MESSAGE_BIRD_ACCESS_KEY
} = require('../configs/config');

const messagebird = require('messagebird')(MESSAGE_BIRD_ACCESS_KEY);

const sendMessage = (userPhoneNumber, messageText = '') => new Promise((resolve) => {

    const normalizeUPhoneNumber = userPhoneNumber.replace('+', '');

    messagebird.messages.create({
        originator: 'Booking',
        recipients: [normalizeUPhoneNumber],
        body: messageText
    },
    function(err, response) {
        resolve(response);
    });
});

module.exports = {
    sendMessage
};

