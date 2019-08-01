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

function writeTenMillionRestaurants(writer, data, encoding, callback) {
    let i = 10000000;
    write();
    function write() {
      let ok = true;
      do {
        i--;
        if (i === 0) {
          // last time!
          restaurantInfoWriter.write(data, encoding);
        } else {
          // see if we should continue, or wait
          // don't pass the callback, because we're not done yet.
          ok = restaurantInfo.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        // had to stop early!
        // write some more once it drains
        writer.once('drain', write);
      }
    }
  }

