const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// npm run build generates the static sites
app.use(express.static(path.join(__dirname, '../build')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}/`);
});