const faker = require('faker');
const fs = require('fs');
const { Writable } = require('stream');

let reviewsWriter = fs.createWriteStream('./restaurantReviews.csv', { flags: 'a'});
const reviewsColumns = "restaurantid,username,userlocation,usertotalreviews,reviewdate,reviewoverallrating,reviewfoodrating,reviewservicerating,reviewambiencerating,reviewvaluerating,reviewhelpfulcount,reviewnoise,reviewrecommend,reviewbody";
// reviewsWriter.write(`${reviewsColumns},`);

let restaurantInfoWriter = fs.createWriteStream('./restaurantInfo.csv');
const restaurantInfoColumns = "restaurantid,neighborhood,avgoverallrating,avgfoodrating,avgservicerating,avgambiencerating,avgvaluerating,avgnoiserating,avgrecrating,keywords";
// restaurantInfoWriter.write(`${restaurantInfoColumns},`);

// let writer = fs.createWriteStream('./cassandraTest1.csv');


// let reader = fs.createReadStream('./data.csv').pipe(writer);

const dataGen = (limit) => {
  console.log('MISSION START');
    //this will output an entire string of array separated values.
    // remember the format of the csv file
    // THIS WILL BE USED IN ONE CSV FILE, THAT CSV FILE WILL BE LOADED INTO
    // 2 SEPARATE TABLES. THE ONLY DIFF BETWEEN THE 2 TABLES IS
    // THEY GET QUERIED DIFFERNETLY.
var totalReviews = [];
var currentRowCount = 100000;
for (let i = 0; i < limit; i += 1) {

    if (i === currentRowCount) {
      // printProgress(limit - currentRowCount);
      currentRowCount += 100000;
      console.log(`CURRENT ROW COUNT : ${currentRowCount}`);
    };

    var restaurant = {};
    const numReviews = faker.random.number({ min: 15, max: 65 });

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


  for (let j = 1; j <= numReviews; j += 1) {

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

    totalReviews.push(reviewObj);
  } // end of review for loop

    restaurant.avgOverall = Math.round(sumOverall / numReviews * 10) / 10;
    restaurant.avgFood = Math.round(sumFood / numReviews * 10) / 10;
    restaurant.avgService = Math.round(sumService / numReviews * 10) / 10;
    restaurant.avgAmbience = Math.round(sumAmbience / numReviews * 10) / 10;
    restaurant.avgValue = Math.round(sumValue / numReviews * 10) / 10;
    restaurant.avgNoise = Math.round(sumNoise / numReviews * 10) / 10;
    restaurant.avgRec = (sumRecommend / numReviews) * 100;

    // console.log('restaurantObj below');
    // console.log(restaurant);
    restaurantInfoWriter.write(`${restaurant.restaurantID},${restaurant.avgAmbience},${restaurant.avgFood},${restaurant.avgNoise},${restaurant.avgOverall},${restaurant.avgRec},${restaurant.avgService},${restaurant.avgValue},"${restaurant.keyWords}",${restaurant.neighborhood}\n`);
   } //end of house for loop
   //we have restaurantObj and totalReviews[]
   //first enter record into restaurant info table , since its very small

   console.log(totalReviews.length);
   for (var y = 0; y < totalReviews.length; y++) {
       reviewsWriter.write(`${totalReviews[y].restaurantID},${totalReviews[y].date},${totalReviews[y].ambienceRating},${totalReviews[y].body},${totalReviews[y].foodRating},${totalReviews[y].helpfulCount},${totalReviews[y].noise},${totalReviews[y].overallRating},${totalReviews[y].recommend},${totalReviews[y].serviceRating},${totalReviews[y].valueRating},${totalReviews[y].city},${totalReviews[y].userName},${totalReviews[y].userTotalReviews}\n`);
   }
}


const printProgress = (progress) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(progress + ' records left to create');
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
