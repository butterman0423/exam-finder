const express = require('express');
const pg = require('pg');
const route = express.Router();

// Query exam date of :class and :section
route.get('/:cls/:section', (req, res) => {
    const { cls, section } = req.params;
    const key = `${cls}_${section}`;

});

// Future calendar request route

module.exports = route;