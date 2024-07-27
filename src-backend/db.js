require('dotenv').config();
const { Pool } = require('pg');
const fs = require("fs");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream('spring24.csv');

let pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const createAndFillTable = async () => {
    try {
        const result = await pool.query(`SELECT 1 FROM pg_database WHERE datname=$1`, ['finals_database']);
        
        // Create database if it doesn't exist
        if (result.rowCount === 0) 
        {
            await pool.query(`CREATE DATABASE finals_database`);
            console.log("Creating finals database");
            
            pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: "finals_database",
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT
            });

            await pool.query(`
                CREATE TABLE IF NOT EXISTS final_exams (
                    course_section VARCHAR(20),
                    day_date VARCHAR(50),
                    start_time VARCHAR(20),
                    end_time VARCHAR(20), 
                    building_room VARCHAR(50),
                    instructor VARCHAR(50)
                )
            `);

            let csvData = [];
            let csvStream = fastcsv
                .parse({ headers: true }) // Parses the CSV and uses the first row as headers
                .on("data", function (data) {
                    csvData.push(data);
                })
                .on("end", async function () {
                    const query = `
                        INSERT INTO final_exams (course_section, day_date, start_time, end_time, building_room, instructor) VALUES ($1, $2, $3, $4, $5, $6)
                    `;

                    for (let row of csvData) 
                    {
                        try {
                            await pool.query(query, [
                                row['Course and Section'],
                                row['Day and Date'],
                                row['Start Time'],
                                row['End Time'],
                                row['Building and Room(s)'],
                                row['Instructor']
                            ]);
                            console.log("Inserted row:", row);
                        } catch (err) {
                            console.log(err.stack);
                        }
                    }
                });

            stream.pipe(csvStream);
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { pool, createAndFillTable };
