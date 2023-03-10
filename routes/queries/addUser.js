const {pool} = require("../../db");

const addUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        // check if user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).send('User with this email already exists');
        }

        // insert new user
        const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email]);
        res.status(200).send('USER CREATED');
    }
    catch (error) {
        res.status(400).send(error);
    }
}


module.exports = addUser