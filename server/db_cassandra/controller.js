const cassandraClient = require('./index.js').client;


const getData = (req, res) => {
  const query = 'select * from restaurant_info WHERE restaurantid=?;';
  const id = req.params.id;
  cassandraClient.execute(query, [id], {prepare: true})
  .then(result => {
    //GET RESTAURANTINFO THEN GET RESTAURANT_REVIEWS
    cassandraClient.execute('select * from restaurant_reviews WHERE restaurantid=?', [id], {prepare: true})
    .then(reviews => {
      res.status(200).send([result.rows, reviews.rows]);
    })
    .catch(error => {

    });
  })
  .catch(error => {
    console.log('CATCHING ERROR BELOW');
    console.log(error);
  });
}

const deleteData = (req, res) => {

}

const updateData = (req, res) => {
  //put guard clause to ensure only ALLOWED changes come through
  console.log(req.body);
  // console.log(req.params);
  // console.log(req.query);



  let values = [];
  let field;

  //GET FIELD WHICH IS FIRST PROPERTY OF REQ.BODY and push value to array
  for (let key in req.body) {
    if (!field) field = key;
    values.push(req.body[key]);
    break;
  }
  //for this API to work, they must provide the following fields ,
  //field to be changed,reviewoverallrating,restaurantid,reviewdate,reviewid,username
  let queryColumns = ['reviewoverallratings', 'restaurantid', 'reviewdate', 'reviewid'];

  let query = `UPDATE reviews_by_rating SET ${field}=? WHERE reviewoverallrating=? AND restaurantid=? AND reviewdate=? AND reviewid=?`;

  //NOW GET OTHER PROPERTIES
  for (let value of queryColumns) {
    values.push(req.body[value]);
  }


  //UPDATE SECOND TABLE;
  let secondQuery =  `UPDATE restaurant_reviews SET ${field}=? WHERE restaurantid=? AND reviewdate=? AND username=? AND reviewid=?`;
  let secondColumns = ['restaurantid', 'reviewdate', 'username', 'reviewid'];
  let secondValues = [];
  secondValues.push(req.body[field]);

  //USE EXISTING FIELD VARIABLE SINCE ITS SHARED AMONGST 2 TABLES;
  for (let value of secondColumns) {
    secondValues.push(req.body[value]);
  }


  console.log('SECOND VALUES BELOW');
  console.log(secondValues);

  cassandraClient.execute(query, values, {prepare: true})
  .then(result => {
    console.log('REVIEWS_BY_RATING HAS BEEN UPDATED');
    cassandraClient.execute(secondQuery, secondValues, {prepare: true})
    .then(result => {
      console.log('RESTAURANT_REVIEWS HAS BEEN UPDATED');
      res.status(200).send(result);
    })
    .catch(error => {
      console.log('CANNOT WRITE TO 2ND TABLE RESTAURANT_REVIEWS');
      console.log(error);
    });
  })
  .catch(error => {
    console.log('COULD NOT UPDATE');
    console.log(error);
    res.status(400).send(error);
  });
}


const createData = (req, res) => {
  let values = [];
  for(var key in req.body) {
    values.push(req.body[key]);
  }
  //do not FORGET YOU NEED TO INSTALL CASSANDRA UUID GENERATOR
  //YOU ARE CURLING IN UUIDS, WE WON'T BE AABLE TO ALWAYS DO THAT. WE HAVE TO GENERATE THEM HERE

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
