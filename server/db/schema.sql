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
  review_overall_rating DECIMAL(2,1),
  review_food_rating INT,
  review_service_rating INT,
  review_ambience_rating INT,
  review_value_rating INT,
  review_helpful_count INT,
  review_noise INT,
  review_recommend BOOLEAN,
  review_body VARCHAR(2000),
  PRIMARY KEY (review_id)
);

CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id INT,
  restaurant_total_reviews INT,
  avg_overall_rating DECIMAL(2,1),
  avg_food_rating DECIMAL(2,1),
  avg_service_rating DECIMAL(2,1),
  avg_ambience_rating DECIMAL(2,1),
  avg_value_rating DECIMAL(2,1),
  avg_noise_rating INT,
  avg_rec_rating INT,
  PRIMARY KEY (restaurant_id)
);



