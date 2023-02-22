const { MessagingResponse } = require('twilio').twiml;
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function sendSms(message, from, to) {
    return client.messages.create({ body: message, from, to });
}

function generateTwimlMessage(message) {
    const twiml = new MessagingResponse();
    twiml.message(message);
    return twiml.toString();
}

module.exports = {
    sendSms,
    generateTwimlMessage
};
