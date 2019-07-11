DROP DATABASE IF EXISTS reservlyreviews;
CREATE DATABASE reservlyreviews;

USE reservlyreviews;

CREATE TABLE IF NOT EXISTS reviews (
  INT NOT NULL AUTO_INCREMENT,
  restaurantID INT,
  userName VARCHAR(100),
  userLocation VARCHAR(100),
  userTotalReviews INT,
  reviewDate DATE,
  reviewOverallRating DECIMAL(2,1),
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
  avgOverallRating DECIMAL(2,1),
  avgFoodRating DECIMAL(2,1),
  avgServiceRating DECIMAL(2,1),
  avgAmbienceRating DECIMAL(2,1),
  avgValueRating DECIMAL(2,1),
  avgNoiseRating INT,
  avgRecRating INT,
  PRIMARY KEY (restaurantID)
);



