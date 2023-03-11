const {pool} = require("../../db");

const addUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        // check if user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.send('User with this email already exists');
        }
        // check if username or email is null or empty don't insert
        if (!username || !email) {
            return res.send('Username or email is empty');
        }
        // insert new user
        const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email]);
        res.status(200).send('User added');
    }
    catch (error) {
        res.status(400).send(error);
    }
}


module.exports = addUser