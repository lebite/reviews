DROP DATABASE IF EXISTS reservlyreviews;
CREATE DATABASE reservlyreviews;

USE reservlyreviews;

CREATE TABLE IF NOT EXISTS reviews (
  reviewID INT NOT NULL AUTO_INCREMENT,
  restaurantID INT,
  userName VARCHAR(100),
  userLocation VARCHAR(100),
  userTotalReviews INT,
  reviewDate DATE,
  reviewOverallRating INT,
  reviewFoodRating INT,
  reviewServiceRating INT,
  reviewAmbienceRating INT,
  reviewValueRating INT,
  reviewHelpfulCount INT,
  reviewNoise INT,
  reviewRecommend BOOLEAN,
  reviewBody VARCHAR(2000),
  PRIMARY KEY (reviewID)
);

CREATE TABLE IF NOT EXISTS restaurants (
  restaurantID INT,
  restaurantTotalReviews INT,
  avgOverallRating DECIMAL(2,1) zerofill,
  avgFoodRating DECIMAL(2,1),
  avgServiceRating DECIMAL(2,1),
  avgAmbienceRating DECIMAL(2,1),
  avgValueRating DECIMAL(2,1),
  avgNoiseRating INT,
  avgRecRating INT,
  keyWords VARCHAR(300),
  neighborhood VARCHAR(50),
  PRIMARY KEY (restaurantID)
);



