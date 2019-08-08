import http from "k6/http";


export default function() {
  var url = "http://localhost:3004";
  var payload = JSON.stringify({ email: "aaa", password: "bbb" });
  var params =  { headers: { "Content-Type": "application/json" } }
  http.post(url, payload, params);
};


