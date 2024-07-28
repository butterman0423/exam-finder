const express = require('express');
const route = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: "exam_finder_db_user",
    host: "dpg-cqipgr6ehbks73c1fki0-a",
    database: "exam_finder_db",
    password: "iKkQmkZaShmmTe5cMYjO06t1CUWEDzmM",
    port: 5432
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
