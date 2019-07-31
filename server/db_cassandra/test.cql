CREATE KEYSPACE reservlyreviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE reservlyreviews;

CREATE TABLE restaurant_info (
    restaurantID INT,
    neighborhood text,
    avgOverallRating DECIMAL,
    avgFoodRating DECIMAL,
    avgServiceRating DECIMAL,
    avgAmbienceRating DECIMAL,
    avgValueRating DECIMAL,
    avgNoiseRating DECIMAL,
    avgRecRating DECIMAL,
    keywords text,
    PRIMARY KEY(restaurantID)
);


CREATE TABLE restaurant_reviews (
    restaurantID INT,
    userName text,
    userLocation text,
    userTotalReviews INT,
    reviewDate timestamp,
    reviewOverallRating INT,
    reviewFoodRating INT,
    reviewServiceRating INT,
    reviewAmbienceRating INT,
    reviewValueRating INT,
    reviewHelpfulCount INT,
    reviewNoise INT,
    reviewRecommend boolean,
    reviewBody text,
    PRIMARY KEY(restaurantID, reviewDate)
);


CREATE TABLE reviews_by_rating (
    restaurantID INT,
    userName text,
    userLocation text,
    userTotalReviews INT,
    reviewDate timestamp,
    reviewOverallRating INT,
    reviewFoodRating INT,
    reviewServiceRating INT,
    reviewAmbienceRating INT,
    reviewValueRating INT,
    reviewHelpfulCount INT,
    reviewNoise INT,
    reviewRecommend boolean,
    reviewBody text,
    PRIMARY KEY(reviewOverallRating)
);