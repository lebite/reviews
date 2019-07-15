const express = require('express');
const path = require('path');
var cors = require('cors')

const app = express();
const port = 3004;

const db = require('./db/index.js');

app.use(express.json());
app.use(cors())

app.get('/:restaurantID/reviews', (req, res) => {
  let sqlreq = '';
  let sqlargs = [];
  if (req.query.sort === 'Highest Rating') {
    if (req.query.stars && req.query.keyword) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE restaurantID=? AND reviewBody LIKE ? AND reviewOverallRating LIKE ? ORDER BY reviews.reviewOverallRating DESC';
      sqlargs = [req.params.restaurantID, `%${req.query.keyword}%`, `%${req.query.stars}%`];
    } else if (req.query.stars) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE restaurantID=? AND reviewOverallRating LIKE ? ORDER BY reviews.reviewOverallRating DESC';
      sqlargs = [req.params.restaurantID, `%${req.query.stars}%`];
    } else if (req.query.keyword) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE reviews.restaurantID=? AND reviewBody LIKE ? ORDER BY reviews.reviewOverallRating DESC';
      sqlargs = [req.params.restaurantID, `%${req.query.keyword}%`]
    } else {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE reviews.restaurantID=? ORDER BY reviews.reviewOverallRating DESC';
      sqlargs = [req.params.restaurantID];
    }
  } else if (req.query.sort === 'Lowest Rating') {
    if (req.query.stars && req.query.keyword) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE restaurantID=? AND reviewBody LIKE ? AND reviewOverallRating LIKE ? ORDER BY reviews.reviewOverallRating ASC';
      sqlargs = [req.params.restaurantID, `%${req.query.keyword}%`, `%${req.query.stars}%`];
    } else if (req.query.stars) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE restaurantID=? AND reviewOverallRating LIKE ? ORDER BY reviews.reviewOverallRating ASC';
      sqlargs = [req.params.restaurantID, `%${req.query.stars}%`];
    } else if (req.query.keyword) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE reviews.restaurantID=? AND reviewBody LIKE ? ORDER BY reviews.reviewOverallRating ASC';
      sqlargs = [req.params.restaurantID, `%${req.query.keyword}%`]
    } else {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE reviews.restaurantID=? ORDER BY reviews.reviewOverallRating ASC';
      sqlargs = [req.params.restaurantID];
    }
  } else if (req.query.sort === 'Newest') {
    if (req.query.stars && req.query.keyword) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE restaurantID=? AND reviewBody LIKE ? AND reviewOverallRating LIKE ? ORDER BY reviews.reviewDate DESC';
      sqlargs = [req.params.restaurantID, `%${req.query.keyword}%`, `%${req.query.stars}%`];
    } else if (req.query.stars) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE restaurantID=? AND reviewOverallRating LIKE ? ORDER BY reviews.reviewDate DESC';
      sqlargs = [req.params.restaurantID, `%${req.query.stars}%`];
    } else if (req.query.keyword) {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE reviews.restaurantID=? AND reviewBody LIKE ? ORDER BY reviews.reviewDate DESC';
      sqlargs = [req.params.restaurantID, `%${req.query.keyword}%`]
    } else {
      sqlreq = 'SELECT reviews.* FROM reviews WHERE reviews.restaurantID=? ORDER BY reviews.reviewDate DESC';
      sqlargs = [req.params.restaurantID];
    }
  } else if (req.query.keyword) {
    sqlreq = 'SELECT reviews.* FROM reviews WHERE restaurantID=? AND reviewBody LIKE ?';
    sqlargs = [req.params.restaurantID, `%${req.query.keyword}%`];
  } else if (req.query.stars) {
    sqlreq = 'SELECT reviews.* FROM reviews WHERE restaurantID=? AND reviewOverallRating LIKE ?';
    sqlargs = [req.params.restaurantID, `%${req.query.stars}%`];
  } else {
    console.log('we got here')
    sqlreq = 'SELECT reviews.*, restaurants.* FROM reviews, restaurants WHERE reviews.restaurantID=restaurants.restaurantID AND reviews.restaurantID=? ORDER BY reviews.reviewDate DESC';
    sqlargs = [req.params.restaurantID];
  }

  db.connection.query(sqlreq, sqlargs, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
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
