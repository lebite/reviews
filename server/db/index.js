const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  database: 'reservlyreviews',
  password: 'password'
});

connection.connect();

module.exports.connection = connection;
