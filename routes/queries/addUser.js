const {pool} = require("../../db");

const addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
        res.status(200).send('USER CREATED');
    }
    catch (error) {
        res.status(400).send(error);
    }
}

module.exports = addUser