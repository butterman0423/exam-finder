const express = require('express');
const route = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: "finals_database",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

route.get('/:cls/:section', async (req, res) => {
    const { cls, section } = req.params;
    const key = `${cls}_${section}`;

    try {
        console.log(`Querying for course section: ${key}`);
        const result = await pool.query(
            `SELECT * FROM final_exams WHERE course_section = $1`,
            [key]
        );
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = route;
