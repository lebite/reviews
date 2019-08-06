const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const app = express();
const port = 3004;

const db = require('./db/index.js');
const cassandraDB = require('./db_cassandra/controller.js');

app.use(express.json());

// app.use(express.static(path.join(__dirname, '../client/dist')));
// app.use('/:restaurantID', express.static(path.join(__dirname, '../client/dist')));

app.use('/', expressStaticGzip(path.join(__dirname, '../client/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz']
 }));

 app.use('/:restaurantID', expressStaticGzip(path.join(__dirname, '../client/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz']
 }));

app.get('/:id/testing', (req,res) => {
  console.log('TESTING ROUTE RECEIVED');
  cassandraDB.getData(req,res);
});

app.post('/:id/postTest', (req,res) => {
  cassandraDB.createData(req,res);
});

app.patch('/:id/patchTest', (req,res) => {
  cassandraDB.updateData(req,res);
});


app.delete('/:id/delete', (req,res) => {
  cassandraDB.deleteData(req,res);
});



app.get('/:restaurantID/reviews', (req, res) => {
  console.log('I AM REVIEWS ROUTE');
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


app.post('/:restaurantID/reviews', (req,res) => {
  //req.body
})

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

app.listen(port, () => { console.log(`Listening on port ${port}`); });
