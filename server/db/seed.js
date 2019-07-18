const faker = require('faker');
const db = require('./index.js');

const reviews = [];
const restaurants = [];

for (let i = 0; i < 99; i += 1) {
  const numReviews = faker.random.number({ min: 15, max: 65 });
  const restaurantID = i;
  const restaurantTotalReviews = numReviews;

  let sumOverall = 0;
  let sumFood = 0;
  let sumService = 0;
  let sumAmbience = 0;
  let sumValue = 0;
  let sumNoise = 0;
  let sumRecommend = 0;
  const keyWords = faker.fake('{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}}');
  const neighborhood = faker.lorem.word();

  for (let j = 1; j <= numReviews; j += 1) {
    const userName = faker.fake('{{name.firstName}}{{name.lastName}}');
    const city = faker.address.city();
    const totalReviews = faker.random.number({ min: 1, max: 30 });
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
    avgValue, avgNoise, avgRec, keyWords, neighborhood]);
}

const sqlreviewsreq = 'INSERT INTO reviews (restaurantID, userName, userLocation, userTotalReviews, reviewDate, reviewOverallRating, reviewFoodRating, reviewServiceRating, reviewAmbienceRating, reviewValueRating, reviewHelpfulCount, reviewNoise, reviewRecommend, reviewBody) VALUES ?';

const sqlrestreq = 'INSERT INTO restaurants (restaurantID, restaurantTotalReviews, avgOverallRating, avgFoodRating, avgServiceRating, avgAmbienceRating, avgValueRating, avgNoiseRating, avgRecRating, keyWords, neighborhood) VALUES ?';

db.connection.query(sqlreviewsreq, [reviews], (err) => {
  if (err) {
    console.log(err);
  } else {
    db.connection.query(sqlrestreq, [restaurants], (err2) => {
      if (err2) {
        console.log(err2);
      } else {
        console.log('success writing to db');
        db.connection.end()
      }
    });
  }
});
