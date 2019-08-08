import http from "k6/http";

export let options = {
  // stages: [
  //   {duration: '10s',target: 10},
  //   {duration: '10s',target: 50},
  //   {duration: '10s',target: 100},
  //   {duration: '1m',target: 150},
  //   {duration: '10s',target: 100},
  //   {duration: '10s',target: 50},
  //   {duration: '10s',target: 0},
  // ]
  vus: 150,
  duration: '30s'
}

export default function() {
  let randomRestaurantID = Math.floor(Math.random() * (200) + 1);
  http.get(`http://localhost:3004/${randomRestaurantID}/testing`);
};

