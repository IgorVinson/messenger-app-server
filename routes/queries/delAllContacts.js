const {pool} = require("../../db");

const delAllContacts =async (req, res) => {
    try {
        await pool.query('TRUNCATE users CASCADE;')
        await pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
        res.status(200).send('USERS DELETED');
    }
    catch (error) {
        res.status(400).send(error);
    }
}

export default delAllContacts;
