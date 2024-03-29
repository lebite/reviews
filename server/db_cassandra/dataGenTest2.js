const faker = require('faker');
const fs = require('fs');

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

const dataGen = (limit, i = 1) => {
  console.log('MISSION START');
  var startLimit = limit;
  var totalReviews = [];
  var currentRowCount = 100000;

  var drainRestaurant = true;
  var drainReviews;

  while(limit > 0 && drainRestaurant) {
      limit--;
      if (i === currentRowCount) {
        printProgress(startLimit - currentRowCount);
        currentRowCount += 100000;
        // console.log(`CURRENT ROW COUNT : ${currentRowCount}`);
      };

      var restaurant = {};
      let numReviews = faker.random.number({ min: 15, max: 65 });

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

      writeReviews();

      function writeReviews() {
        drainReviews = true;
        while ( numReviews > 0  && drainReviews) {
          numReviews--;

          var reviewObj = {};
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

          if (numReviews === 0) {
            reviewsWriter.write(`${reviewObj.restaurantID},${reviewObj.date},${reviewObj.ambienceRating},${reviewObj.body},${reviewObj.foodRating},${reviewObj.helpfulCount},${reviewObj.noise},${reviewObj.overallRating},${reviewObj.recommend},${reviewObj.serviceRating},${reviewObj.valueRating},${reviewObj.city},${reviewObj.userName},${reviewObj.userTotalReviews}\n`, 'utf8');
          } else {
            drainReviews = reviewsWriter.write(`${reviewObj.restaurantID},${reviewObj.date},${reviewObj.ambienceRating},${reviewObj.body},${reviewObj.foodRating},${reviewObj.helpfulCount},${reviewObj.noise},${reviewObj.overallRating},${reviewObj.recommend},${reviewObj.serviceRating},${reviewObj.valueRating},${reviewObj.city},${reviewObj.userName},${reviewObj.userTotalReviews}\n`, 'utf8');
          }


        } // end of while for loop

        if (numReviews > 0) {
          reviewsWriter.once('drain', writeReviews);
        }
      }

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
        drainRestaurant = restaurantInfoWriter.write(`${restaurant.restaurantID},${restaurant.avgAmbience},${restaurant.avgFood},${restaurant.avgNoise},${restaurant.avgOverall},${restaurant.avgRec},${restaurant.avgService},${restaurant.avgValue},"${restaurant.keyWords}",${restaurant.neighborhood}\n`, 'utf8');
      }

      // if (drainRestaurant === false) {
      //   restaurantInfoWriter.once('drain', () => {console.log(`RESTAURANT_INFO_WRITER: DRAINED , i value ${i}`)});
      // }
    } //end of house while loop
    //YOU WILL REACH THIS LINE ONCE THE LOOP BREAKS
    if (limit > 0) {
      console.log(`RESTAURANT OUTERLOOP BROKE , CURRENT LIMIT IS ${limit}, CURRENT RESTID IS ${i}`);
      restaurantInfoWriter.once('drain', () => {dataGen(limit, i)});
    }

    console.log('SEED COMPLETED');
}



dataGen(10000000);










// function writeOneMillionTimes(writer, data, encoding, callback) {
  //     let i = 1000000;
//     write();
//     function write() {
//       let ok = true;
//       do {
//         i--;
//         if (i === 0) {
//           // last time!
//           writer.write(data, encoding, callback);

//         } else {
//           // see if we should continue, or wait
//           // don't pass the callback, because we're not done yet.
//           ok = writer.write(data(), encoding);
//           otherOk = writer2.write(data(), encoding);
//         }
//       } while (i > 0 && ok);
//       if (i > 0) {
//         // had to stop early!
//         // write some more once it drains
//         writer.once('drain', write);
//       }
//     }
//   }
