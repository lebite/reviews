const express = require('express');
const app = express();
const port = 3000;

const seed = require('./db/seed.js');


app.listen(port, () => { console.log(`Listening on port ${port}`); });

// when we first load the page, seed.getrandinfo will fill our
// database with 100 reviews, 100 users and 100 restaurants
app.get('/', (req, res) => {
  seed.getrandinfo((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});
