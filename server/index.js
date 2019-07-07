const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


const db = require('./db/index.js');

app.get('/:restaurant_id/reviews', (req, res) => {
  const sqlreq = 'SELECT * FROM reviews WHERE restaurant_id=?';
  const sqlargs = req.params.restaurant_id;
  db.connection.query(sqlreq, sqlargs, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => { console.log(`Listening on port ${port}`); });
