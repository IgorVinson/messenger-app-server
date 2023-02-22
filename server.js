require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
const { OAuth2Client } = require('google-auth-library');

const accountSid = "AC729ffa3f8c50c24803da43008b55a29b";
const authToken = "cff37ec85b3d00cdecefbb7951d2077a";
const client = require("twilio")(accountSid, authToken);

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message('How are you ?!');
    res.type('text/xml').send(twiml.toString());
});

app.post('/api/messages', (req, res) => {
    const { body } = req;
    const message = body.data;

    client.messages
        .create({ body: message, from: "+14407722429", to: "+15096099820" })
        .then(message => console.log(message.sid))
        .catch(err => res.send({err,body}));

    // res.send(body);
})

console.log('Server is running on port 8080');

app.listen(8080, () => {
    console.log(`Express server listening on port ${8080}`);
})


const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(token) {
    const ticket = await oAuth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { name, email } = payload;
    return { name, email };
}

app.post('/google-login', async (req, res) => {
    const { credential } = req.body;
    const { name, email } = await verify(credential);
    // use the name and email to create or update a user record in your database
    res.json({ success: true, name, email });
});