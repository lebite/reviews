const faker = require('faker');
const db = require('./index.js');

const reviews = [];
const restaurants = [];

for (let i = 1; i <= 100; i += 1) {
  const numReviews = faker.random.number({ min: 1, max: 40 });
  const restaurantID = i;
  const restaurantTotalReviews = numReviews;

  let sumOverall = 0;
  let sumFood = 0;
  let sumService = 0;
  let sumAmbience = 0;
  let sumValue = 0;
  let sumNoise = 0;
  let sumRecommend = 0;

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
    const recommend = faker.random.boolean();
    const body = faker.lorem.paragraph();

    sumOverall += overallRating;
    sumFood += foodRating;
    sumService += serviceRating;
    sumAmbience += ambienceRating;
    sumValue += valueRating;
    sumNoise += noise;
    recommend ? sumRecommend += 1 : sumRecommend;

    reviews.push([
      restaurantID, userName, city, totalReviews, date, overallRating, foodRating, serviceRating,
      ambienceRating, valueRating, helpfulCount, noise, recommend, body,
    ]);
  }

  const avgOverall = Math.round(sumOverall / numReviews * 10) / 10;
  const avgFood = Math.round(sumFood / numReviews * 10) / 10;
  const avgService = Math.round(sumService / numReviews * 10) / 10;
  const avgAmbience = Math.round(sumAmbience / numReviews * 10) / 10;
  const avgValue = Math.round(sumValue / numReviews * 10) / 10;
  const avgNoise = Math.round(sumNoise / numReviews * 10) / 10;
  const avgRec = (sumRecommend / numReviews) * 100;

  restaurants.push([restaurantID, restaurantTotalReviews,
    avgOverall, avgFood, avgService, avgAmbience,
    avgValue, avgNoise, avgRec]);
}

const sqlreviewsreq = 'INSERT INTO reviews (restaurant_id, user_name, user_location, user_total_reviews, review_date, review_overall_rating, review_food_rating, review_service_rating, review_ambience_rating, review_value_rating, review_helpful_count, review_noise, review_recommend, review_body) VALUES ?';

const sqlrestreq = 'INSERT INTO restaurants (restaurant_id, restaurant_total_reviews, avg_overall_rating, avg_food_rating, avg_service_rating, avg_ambience_rating, avg_value_rating, avg_noise_rating, avg_rec_rating) VALUES ?';

db.connection.query(sqlreviewsreq, [reviews], (err) => {
  if (err) {
    console.log(err);
  } else {
    db.connection.query(sqlrestreq, [restaurants], (err2) => {
      if (err2) {
        console.log(err2);
      } else {
        console.log('success writing to db');
      }
    });
  }
});
