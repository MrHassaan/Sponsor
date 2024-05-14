// session-store.js
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI, // MongoDB connection URI
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2, // Session expiry time (2 hours)
});

store.on('error', function (error) {
  console.log(error);
});

module.exports = store;
