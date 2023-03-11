const {pool} = require("../../db");

const addUser = async (req, res) => {
    const { username, email } = req.body;
    try {
        // check if username or email is null or empty don't insert
        if (!username || !email) {
            return res.status(200).send('Username or email is empty');
        }

        // check if user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            //find user by email and return it
            const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return res.status(200).send(user.rows[0]);
        }

        // insert new user
        await pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email]);
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.status(200).send(user.rows[0]);

    }
    catch (error) {
        res.status(400).send(error);
    }
}


module.exports = addUser