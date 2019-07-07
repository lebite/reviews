const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


const db = require('./db/index.js');

app.get('/restaurant', (req, res) => {
  const sqlreq = 'SELECT * FROM reviews';
  db.connection.query(sqlreq, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => { console.log(`Listening on port ${port}`); });
