const faker = require('faker');
const db = require('./index.js');

const reviews = [];

for (let i = 1; i <= 100; i += 1) {
  const numReviews = faker.random.number({ min: 1, max: 20 });
  // const newReview = [];
  const restaurantID = i;
  // const restaurant = faker.company.companyName();

  for (let j = 1; j <= numReviews; j += 1) {
    const userName = faker.internet.userName();
    const city = faker.address.city();
    const totalReviews = faker.random.number(30);
    const date = faker.date.past();
    const overallRating = faker.random.number({ min: 1, max: 5 });
    const foodRating = faker.random.number({ min: 1, max: 5 });
    const serviceRating = faker.random.number({ min: 1, max: 5 });
    const ambienceRating = faker.random.number({ min: 1, max: 5 });
    const valueRating = faker.random.number({ min: 1, max: 5 });
    const helpfulCount = faker.random.number({ min: 0, max: 20 });
    const noise = faker.random.number({ min: 1, max: 4 });
    const body = faker.lorem.paragraph();

    reviews.push([
      restaurantID, userName, city, totalReviews, date,
      overallRating, foodRating, serviceRating,
      ambienceRating, valueRating, helpfulCount, noise, body,
    ]);
  }
}

const sqlreviewsreq = 'INSERT INTO reviews (restaurant_id, user_name, user_location, user_total_reviews, review_date, review_overall_rating, review_food_rating, review_service_rating, review_ambience_rating, review_value_rating, review_helpful_count, review_noise, review_body) VALUES ?';

db.connection.query(sqlreviewsreq, [reviews], (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success writing to db');
  }
});
