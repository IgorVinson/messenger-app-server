require('dotenv').config();
const express = require('express');
const router = express.Router();
const verify = require('../googleAuth');
const { sendSms, generateTwimlMessage } = require('../twilio');
const addUser = require("./queries/addUser");
import getAllContacts from "./queries/getAllContacts";
import delAllContacts from "./queries/delAllContacts";

router.post('/sms', (req, res) => {
    const twimlMessage = generateTwimlMessage('How are you ?!');
    res.type('text/xml').send(twimlMessage);
});

router.post('/api/messages', async (req, res) => {
    const { body } = req;
    const message = body.data;

    try {
        const twilioResponse = await sendSms(message, '+14407722429', '+15096099820');
        console.log(twilioResponse.sid);
        res.send('Message sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send message');
    }
});

router.post('/google-login', async (req, res) => {

    const { credential } = req.body;
    const data = await verify(credential);

    // use the name and email to create or update a user record in your database
    res.json(data);
});

router.post('/addUser', addUser);

router.get('/users', getAllContacts);

router.delete('/users', delAllContacts);

router.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

module.exports = router;
