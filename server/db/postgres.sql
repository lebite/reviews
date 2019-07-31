

CREATE DATABASE reservlyreviews;



CREATE TABLE reservlyreviews.restaurants (
  restaurantID serial,
  restaurantTotalReviews INTEGER,
  avgOverallRating DECIMAL,
  avgFoodRating DECIMAL,
  avgAmbienceRating DECIMAL,
  avgValueRating DECIMAL,
  avgNoiseRating SMALLINT,
  avgRecRating SMALLINT,
  PRIMARY KEY(restaurantId)
);


CREATE TABLE reservlyreviews.reviews (
  reviewId serial,
  restaurantID INTEGER REFERENCES restaurants(restaurantID),
  userLocation VARCHAR(100),
  userTotalReviews INTEGER,
  reviewDate DATE,
  reviewOverallRating INTEGER,
  reviewFoodRating DECIMAL,
  reviewServiceRating DECIMAL,
  reviewAmbienceRating INTEGER,
  reviewValueRating INTEGER,
  reviewHelpfulCount INTEGER,
  reviewNoise INTEGER,
  reviewRecommend BOOLEAN,
  reviewBody VARCHAR(2000),
  PRIMARY KEY (reviewID)
);

CREATE TABLE reservlyreviews.neighborhoods (
  neighborhoodID serial,
  neighborhoodName VARCHAR(100),
  restaurantID INTEGER REFERENCES restaurants(restaurantID),
  PRIMARY KEY(neighborhoodID)
);

CREATE TABLE reservlyreviews.keywords (
  keywordID serial,
  keyword VARCHAR(30),
  PRIMARY KEY (keywordID)
);


CREATE TABLE reservlyreviews.restaurant_keywords (
  id serial,
  restaurantID INTEGER REFERENCES restaurants(restaurantID),
  keywordID INTEGER REFERENCES keywords(keywordID),
  PRIMARY KEY (id)
);
