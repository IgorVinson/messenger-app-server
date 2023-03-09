const {pool} = require("../../db");

const addUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email]);
        res.status(200).send('USER CREATED');
    }
    catch (error) {
        res.status(400).send(error);
    }
}

module.exports = addUser