const cassandraClient = require('./index.js').client;


const getData = (req, res) => {
  //THIS STILL NEEDS TO USE STUBBED IN DATA , ID CANNOT BE HARDCODED
  console.log('GET DATA IS EXECUTING');
  const query = 'select * from restaurant_info WHERE restaurantid=?;';
  const id = 1;
  cassandraClient.execute(query, [id], {prepare: true})
  .then(result => {
    console.log('result below');
    console.log(result);
    res.status(200).send(result);
  })
  .catch(error => {
    console.log('CATCHING ERROR BELOW');
    console.log(error);
  });
}

const deleteData = (req, res) => {

}

const updateData = (req, res) => {

}

const createData = (req, res) => {
  let values = [];
  for(var key in req.body) {
    values.push(req.body[key]);
  }

  let restaurant_reviews_col = 'restaurantid,reviewdate,username,reviewid,reviewambiencerating,reviewbody,reviewfoodrating,reviewhelpfulcount,reviewnoise,reviewoverallrating,reviewrecommend,reviewservicerating,reviewvaluerating,userlocation,usertotalreviews';
  let query = `INSERT INTO restaurant_reviews (${restaurant_reviews_col}) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  //WE must CREATE RECORDS IN BOTH TABLES
  let reviews_by_rating_col = 'reviewoverallrating,restaurantid,reviewdate,reviewid,reviewambiencerating,reviewbody,reviewfoodrating,reviewhelpfulcount,reviewnoise,reviewrecommend,reviewservicerating,reviewvaluerating,userlocation,username,usertotalreviews';

  let reviews_by_rating = reviews_by_rating_col.split(',');
  let secondQueryValues = [];

  for (var value of reviews_by_rating) {
    // secondQueryMap[value] = req.body[value];
    secondQueryValues.push(req.body[value]);
  }

  console.log('SECOND QUERY VALUES BELOW');
  console.log(secondQueryValues);

  let secondQuery = `INSERT INTO reviews_by_rating (${reviews_by_rating_col}) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  cassandraClient.execute(query, values, {prepare: true})
  .then(result => {
    console.log('INSERTED INTO restaurant_reviews OK');
    cassandraClient.execute(secondQuery, secondQueryValues, {prepare: true})
    .then(result => {
      console.log('INSERT INTO REVIEWS_BY_RATING TABLE OK');
      res.status(200).send('OK');
    })
    .catch(error => {
      console.log('ERROR WRITING TO REVIEWS BY RATING TABLE');
    });
  })
  .catch(error => {
    console.log('error! cant create row user in restaurant_reviews table and reviews_by_rating');
    console.log(error);
  });

} //end of createData

module.exports = {getData, deleteData, updateData, createData};
