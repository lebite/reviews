const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['54.183.111.130'],
  localDataCenter: 'datacenter1',
  keyspace: 'reservlyreviews'
});


module.exports.client = client;
