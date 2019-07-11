const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const db = require('./db/index.js');

app.use(express.json());

app.get('/:restaurantID/reviews', (req, res) => {
  if (req.query.sort === 'highestrating') {
    const sqlreq = 'SELECT reviews.*, restaurants.* FROM reviews, restaurants WHERE reviews.restaurantID=restaurants.restaurantID AND reviews.restaurantID=? ORDER BY reviews.reviewOverallRating DESC';
    const sqlargs = req.params.restaurantID;
    db.connection.query(sqlreq, [sqlargs], (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } else if (req.query.sort === 'lowestrating') {
    const sqlreq = 'SELECT reviews.*, restaurants.* FROM reviews, restaurants WHERE reviews.restaurantID=restaurants.restaurantID AND reviews.restaurantID=? ORDER BY reviews.reviewOverallRating ASC';
    const sqlargs = req.params.restaurantID;
    db.connection.query(sqlreq, [sqlargs], (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    const sqlreq = 'SELECT reviews.*, restaurants.* FROM reviews, restaurants WHERE reviews.restaurantID=restaurants.restaurantID AND reviews.restaurantID=? ORDER BY reviews.reviewDate DESC';
    const sqlargs = req.params.restaurantID;
    db.connection.query(sqlreq, [sqlargs], (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.patch('/:restaurantID/reviews', (req, res) => {
  const sqlreq = 'UPDATE reviews SET reviewHelpfulCount = ? WHERE reviewID = ?';
  const sqlargs = [req.body.count, req.body.id];

  db.connection.query(sqlreq, sqlargs, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('success');
    }
  });
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => { console.log(`Listening on port ${port}`); });
