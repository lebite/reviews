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
    reviewID UUID,
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
    PRIMARY KEY(restaurantID, reviewDate, userName));


CREATE TABLE reviews_by_rating (
    restaurantID INT,
    reviewID UUID,
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
    PRIMARY KEY((reviewOverallRating, restaurantID), reviewDate, reviewId));




INSERT INTO restaurant_reviews (
    restaurantid,reviewdate,username,reviewambiencerating,reviewbody,reviewfoodrating,reviewhelpfulcount,reviewid,reviewnoise,reviewoverallrating,reviewrecommend,reviewservicerating,reviewvaluerating,userlocation,usertotalreviews) VALUES (3,'2019-07-28','julioFuentes',5,'place is good',4,20,8af8d970-990b-4866-9b88-6dafa8d4e204,3,3,False,4,3,'san jose',20);
