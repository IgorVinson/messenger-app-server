const { Pool } = require('pg');


const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

pool.on('connect', () => {
    console.log('connected to the db');
})

pool.on('error', (err) => {
    console.error('error connecting to db', err);
});

exports.module = pool;
