const faker = require('faker');
const fs = require('fs');
const UUID = require('cassandra-driver').types.Uuid;

let reviewsWriter = fs.createWriteStream('./restaurantReviews.csv');
const reviewsColumns = "restaurantid,username,userlocation,usertotalreviews,reviewdate,reviewoverallrating,reviewfoodrating,reviewservicerating,reviewambiencerating,reviewvaluerating,reviewhelpfulcount,reviewnoise,reviewrecommend,reviewbody";
// reviewsWriter.write(`${reviewsColumns},`);

let restaurantInfoWriter = fs.createWriteStream('./restaurantInfo.csv');
const restaurantInfoColumns = "restaurantid,neighborhood,avgoverallrating,avgfoodrating,avgservicerating,avgambiencerating,avgvaluerating,avgnoiserating,avgrecrating,keywords";

const printProgress = (progress) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress + ' records left to create');
}

const dataGen = (limit, i = 0) => {
  var startLimit = limit;
  var totalReviews = [];
  var currentRowCount = 100000;

  var drainRestaurant = true;
  var drainReviews;

  let reviewID = 0;

  while(limit > 0 && drainRestaurant) {
      limit--;
      i++;
      if (i === currentRowCount) {
        printProgress(startLimit - currentRowCount);
        currentRowCount += 100000;
        // console.log(`CURRENT ROW COUNT : ${currentRowCount}`);
      };

      var restaurant = {};
      let numReviews = faker.random.number({ min: 15, max: 16 });

      restaurant.restaurantID = i;
      restaurant.keyWords = faker.fake('{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}},{{lorem.word}}');
      restaurant.neighborhood = faker.lorem.word();
      restaurant.restaurantTotalReviews = numReviews;

      let sumOverall = 0;
      let sumFood = 0;
      let sumService = 0;
      let sumAmbience = 0;
      let sumValue = 0;
      let sumNoise = 0;
      let sumRecommend = 0;


        let totalReviews = numReviews;

        for (var j = 0; j < totalReviews; j++) {
          reviewID++;
          var reviewObj = {};
          reviewObj.reviewID = UUID.random();
          reviewObj.restaurantID = restaurant.restaurantID;
          reviewObj.userName = faker.fake('{{name.firstName}}{{name.lastName}}');
          reviewObj.city = faker.address.city();
          reviewObj.userTotalReviews = faker.random.number({ min: 1, max: 30 });
          // reviewObj.date = faker.date.past();
          // PLEASE FIX THE DATE WITH MOMENT TIMESTAMP
          reviewObj.date = '2019-07-29';
          reviewObj.overallRating = faker.random.number({ min: 1, max: 5 });
          reviewObj.foodRating = faker.random.number({ min: 1, max: 5 });
          reviewObj.serviceRating = faker.random.number({ min: 1, max: 5 });
          reviewObj.ambienceRating = faker.random.number({ min: 1, max: 5 });
          reviewObj.valueRating = faker.random.number({ min: 1, max: 5 });
          reviewObj.helpfulCount = faker.random.number({ min: 0, max: 20 });
          reviewObj.noise = faker.random.number({ min: 1, max: 4 });
          reviewObj.recommend = faker.random.boolean();
          reviewObj.body = faker.lorem.paragraph();

          sumOverall += reviewObj.overallRating;
          sumFood += reviewObj.foodRating;
          sumService += reviewObj.serviceRating;

          sumAmbience += reviewObj.ambienceRating;
          sumValue += reviewObj.valueRating;
          sumNoise += reviewObj.noise;
          reviewObj.recommend ? sumRecommend += 1 : sumRecommend;

          //written to cater restaurant_reviews table, use this same csv file to copy to ratings_by_review table and tell it this exact column order.
          reviewsWriter.write(`${reviewObj.restaurantID},${reviewObj.date},${reviewObj.userName},${reviewObj.reviewID},${reviewObj.ambienceRating},${reviewObj.body},${reviewObj.foodRating},${reviewObj.helpfulCount},${reviewObj.noise},${reviewObj.overallRating},${reviewObj.recommend},${reviewObj.serviceRating},${reviewObj.valueRating},${reviewObj.city}, ${reviewObj.userTotalReviews}\n`, 'utf8');
        } // end of for loop

        // if (totalReviews > 0) {
        //   reviewsWriter.once('drain', writeReviews);
        // }

      restaurant.avgOverall = Math.round(sumOverall / numReviews * 10) / 10;
      restaurant.avgFood = Math.round(sumFood / numReviews * 10) / 10;
      restaurant.avgService = Math.round(sumService / numReviews * 10) / 10;
      restaurant.avgAmbience = Math.round(sumAmbience / numReviews * 10) / 10;
      restaurant.avgValue = Math.round(sumValue / numReviews * 10) / 10;
      restaurant.avgNoise = Math.round(sumNoise / numReviews * 10) / 10;
      restaurant.avgRec = (sumRecommend / numReviews) * 100;

      if (limit === 0) {
        restaurantInfoWriter.write(`${restaurant.restaurantID},${restaurant.avgAmbience},${restaurant.avgFood},${restaurant.avgNoise},${restaurant.avgOverall},${restaurant.avgRec},${restaurant.avgService},${restaurant.avgValue},"${restaurant.keyWords}",${restaurant.neighborhood}\n`, 'utf8');
      } else {
        if (limit % 20000 === 0) console.log(`RESTAURANT OUTERLOOP BROlKE , CURRENT LIMIT IS ${limit}, CURRENT RESTAURANT_ID IS ${i}`);
        drainRestaurant = restaurantInfoWriter.write(`${restaurant.restaurantID},${restaurant.avgAmbience},${restaurant.avgFood},${restaurant.avgNoise},${restaurant.avgOverall},${restaurant.avgRec},${restaurant.avgService},${restaurant.avgValue},"${restaurant.keyWords}",${restaurant.neighborhood}\n`, 'utf8');
      }

    } //end of house while loop

    if (limit > 0) {
      restaurantInfoWriter.once('drain', ()=>{dataGen(limit, i)});
    }
}

dataGen(10000000);