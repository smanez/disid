'use strict';

const mongoose = require('mongoose');
const config = require('../config');

let connected = false;

function mongo() {
  const mongoDB = config.db;
  const options = {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  mongoose.connect(mongoDB, options);

  const db = mongoose.connection;
  db.on('open', () => {
    connected = true;
  });

  db.on('error', (err) => {
    console.error(err);
    throw new Error(`Unable to connect to database at ${mongoDB}`);
  });

  mongoose.set('debug', config.mongoose.debug);
}

exports.connect = function connect() {
  if (connected) {
    return;
  }

  mongo();
};
