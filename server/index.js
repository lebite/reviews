const express = require('express');
const app = express();
const port = 3000;

const seed = require('./db/seed.js');


app.listen(port, () => { console.log(`Listening on port ${port}`); });
