const {Pool} = require("pg");

export const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl:true
});

export const connectDb = async () => {
    try {
        const res = await pool.query('SELECT * FROM users')
        if(!!res.rows.length) console.log('POSTGRESQL DB CONNECTED')

    } catch (error) {
        console.log(error)
    }
}

