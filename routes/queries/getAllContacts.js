const {pool} = require("../../db");

const getAllContacts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users')
        res.status(200).send(result.rows);
    }
    catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

export default getAllContacts;
