CREATE KEYSPACE reservlyreviews WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

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
    reviewID UUID,
    userName text,
    userLocation text,
    userTotalReviews INT,
    reviewDate text,
    reviewOverallRating INT,
    reviewFoodRating INT,
    reviewServiceRating INT,
    reviewAmbienceRating INT,
    reviewValueRating INT,
    reviewHelpfulCount INT,
    reviewNoise INT,
    reviewRecommend boolean,
    reviewBody text,
    PRIMARY KEY(restaurantID, reviewDate, userName, reviewID));


CREATE TABLE reviews_by_rating (
    restaurantID INT,
    reviewID UUID,
    userName text,
    userLocation text,
    userTotalReviews INT,
    reviewDate text,
    reviewOverallRating INT,
    reviewFoodRating INT,
    reviewServiceRating INT,
    reviewAmbienceRating INT,
    reviewValueRating INT,
    reviewHelpfulCount INT,
    reviewNoise INT,
    reviewRecommend boolean,
    reviewBody text,
    PRIMARY KEY((reviewOverallRating, restaurantID), reviewDate, reviewId));