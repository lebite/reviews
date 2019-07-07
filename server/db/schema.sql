DROP DATABASE IF EXISTS reservlyreviews;
CREATE DATABASE reservlyreviews;

USE reservlyreviews;

CREATE TABLE IF NOT EXISTS reviews (
  review_id INT NOT NULL AUTO_INCREMENT,
  restaurant_id INT,
  user_name VARCHAR(100),
  user_location VARCHAR(100),
  user_total_reviews INT,
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



