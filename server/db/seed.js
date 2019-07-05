const faker = require('faker');
const db = require('./index.js');

const reviews = [];
const users = [];
const restaurants = [];

for (let i = 1; i<=100; i++) {

  const newReview = [];
  const date = faker.date.past();
  const overallRating = faker.random.number({ min: 1, max: 5 });
  const foodRating = faker.random.number({ min: 1, max: 5 });
  const serviceRating = faker.random.number({ min: 1, max: 5 });
  const ambienceRating = faker.random.number({ min: 1, max: 5 });
  const valueRating = faker.random.number({ min: 1, max: 5 });
  const helpfulCount = faker.random.number({ min: 0, max: 20 });
  const noise = faker.random.number({ min: 1, max: 4 });
  const body = faker.lorem.paragraph();
  newReview.push(date, overallRating, foodRating, serviceRating, ambienceRating, valueRating, helpfulCount, noise, body);
  reviews.push(newReview);


  const newUser = [];
  const userName = faker.internet.userName();
  const city = faker.address.city();
  const totalReviews = faker.random.number(30);
  newUser.push(i, userName, city, totalReviews);
  users.push(newUser);


  const newRest = [];
  const restaurant = faker.company.companyName();
  newRest.push(i, restaurant);
  restaurants.push(newRest);
}


// mysql query
// mysql giving error if we do not explicitly hav ea value
// for review_id in users and restaurants table.
// could think about generating more users and reviews for 100 restaurants
const sqlreviewsreq = 'INSERT INTO reviews (review_date, review_overall_rating, review_food_rating, review_service_rating, review_ambience_rating, review_value_rating, review_helpful_count, review_noise, review_body) VALUES ?';

const sqlusersreq = 'INSERT INTO users (review_id, user_name, user_location, user_total_reviews) VALUES ?';

const sqlrestreq = 'INSERT INTO restaurants (review_id, restaurant_name) VALUES ?';

const getrandinfo = (cb) => {
  db.connection.query(sqlreviewsreq, [reviews], (err) => {
    if (err) {
      cb(err);
    } else {
      db.connection.query(sqlusersreq, [users], (err2) => {
        if (err2) {
          cb(err2);
        } else {
          db.connection.query(sqlrestreq, [restaurants], (err3) => {
            if (err3) {
              cb(err3);
            } else {
              cb(null, 'success adding to database');
            }
          });
        }
      });
    }
  });
};

module.exports.getrandinfo = getrandinfo;
