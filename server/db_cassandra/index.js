const cassandra = require('cassandra-driver');

const client = new cassandra.client({
  contactPoints: ['localhost'],
  localDataCenter: 'localCenter1',
  keyspace: 'reservlyreviews'
});


modules.exports.client = client;
