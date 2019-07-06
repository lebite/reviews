const express = require('express');
const app = express();
const port = 3000;

const seed = require('./db/seed.js');

const path = require('path');
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => { console.log(`Listening on port ${port}`); });
