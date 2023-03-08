require('dotenv').config();
const express = require('express');
const router = express.Router();
const {pool} = require('./db');

const verify = require('./googleAuth');
const { sendSms, generateTwimlMessage } = require('./twilio');


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

router.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving users from database');
        } else {
            res.send(result.rows);
        }
    }).then((result) => {
        console.log(result.rows);
    })
});

module.exports = router;
