const {pool} = require("../../db");

const delAllContacts =async (req, res) => {
    try {
        await pool.query('TRUNCATE users RESTART IDENTITY');
        res.status(200).send('USERS DELETED');
    }
    catch (error) {
        res.status(400).send(error);
    }
}

export default delAllContacts;
