const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


const db = require('./db/index.js');

app.get('/:restaurantID/reviews', (req, res) => {
  const sqlreq = 'SELECT reviews.*, restaurants.* FROM reviews, restaurants WHERE reviews.restaurantID=restaurants.restaurantID AND reviews.restaurantID=? ORDER BY reviews.reviewDate DESC';
  const sqlargs = req.params.restaurantID;
  db.connection.query(sqlreq, [sqlargs], (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => { console.log(`Listening on port ${port}`); });
