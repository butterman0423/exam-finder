// connects to our database
require('dotenv').config();
const Pool = require('pg').Pool;
let pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    //database: "perntodo", //need to comment out later
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// need to make a function that connects to postgres, creates a database, creates a table, then fills in the data

const createandfilltable = async() => {
    try {
        const client = await pool.connect() // returns a new client instance in which we can query tables
        const result = await client.query(`SELECT 1 FROM pg_database WHERE datname=$1`, ['finals_database']);

        //creates database
        if (result.rowCount === 0){
            await client.query(`CREATE DATABASE finals_database`)
        }
        client.release();

        pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: "finals_database",
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        });

        const client2 = await pool.connect(); // get a new client instance
        await client2.query(`
            create table final_exams (
                course_section varchar(20),
                day_date varchar(50),
                start_time varchar(20),
                end_time varchar(20), 
                building_room varchar(50),
                instructor varchar(50)
            )`
        )
        client2.release();

    } catch (error) {
        console.log(error);
        if (client) client.release();
        if (client2) client2.release();
    }
}

module.exports = {pool, createandfilltable};