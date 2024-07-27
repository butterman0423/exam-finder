const express = require('express');
const cors = require('cors');
const path = require('path');
const {pool, createAndFillTable} = require('./db');

const app = express();

const apiRoute = require('./routes/api')

app.use(cors());
app.use(express.json());

// npm run build generates the static sites
app.use(express.static(path.join(__dirname, '../build')));
app.use('/api/finals', apiRoute);

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`App listening on port http://localhost:${PORT}/`);
// });
createAndFillTable()
    .then(() => {
        console.log('Database and table setup completed successfully.');

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`App listening on port http://localhost:${PORT}/`);
        });
    })
    .catch((err) => {
        console.error('Error setting up database and table:', err.message);
        process.exit(1);
    });