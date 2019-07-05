const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reservlyreviews',
});

connection.connect();

module.exports.connection = connection;
