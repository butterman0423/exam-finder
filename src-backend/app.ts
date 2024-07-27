import express from 'express';
import cors from 'cors';
import { join } from 'path';

const app = express();

app.use(cors());
app.use(express.json());

// npm run build generates the static sites
app.use(express.static(join(__dirname, '../build')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});