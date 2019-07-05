DROP DATABASE reservlyreviews;
CREATE DATABASE reservlyreviews;

USE reservlyreviews;

CREATE TABLE IF NOT EXISTS reviews (
  review_id INT NOT NULL AUTO_INCREMENT,
  review_date DATE,
  review_overall_rating INT,
  review_food_rating INT,
  review_service_rating INT,
  review_ambience_rating INT,
  review_value_rating INT,
  review_helpful_count INT,
  review_noise INT,
  review_body VARCHAR(2000),
  PRIMARY KEY (review_id)
);

CREATE TABLE IF NOT EXISTS users (
  review_id INT NOT NULL,
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100),
  user_location VARCHAR(100),
  user_total_reviews INT,
  FOREIGN KEY (review_id)
    REFERENCES reviews(review_id)
);

CREATE TABLE IF NOT EXISTS restaurants (
  review_id INT NOT NULL,
  restaurant_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  restaurant_name VARCHAR(100),
  FOREIGN KEY (review_id)
    REFERENCES reviews(review_id)
);

