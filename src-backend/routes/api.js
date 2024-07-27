const express = require('express');
const route = express.Router();
const pool = require('../db');

// Query exam date of :class and :section
route.get('/:cls/:section', async (req, res) => {
    const { cls, section } = req.params;
    const key = `${cls}_${section}`;

    try{
        const result = await pool.query(
            'SELECT * FROM final_exams WHERE course_section = $1',
            [key]
        );
        res.json(result.rows)
    }
    catch(error){
        console.log(error);
    }

});

// Future calendar request route

module.exports = route;