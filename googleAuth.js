const {OAuth2Client} = require("google-auth-library");
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

module.exports = verify;