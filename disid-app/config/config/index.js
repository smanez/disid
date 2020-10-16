'use strict';

const defaultEnv = 'development';
const env = process.env.NODE_ENV || defaultEnv;
const envConfigPath = `./config.${env}.json`;

const path = require('path');
const _ = require('lodash');

let config = require('./config.json');
const configEnvironment = require(envConfigPath);

config = _.merge(config, configEnvironment);

if (env === defaultEnv) {
  try {
    let configLocal = require('./config.local.json');
    config = _.merge(config, configLocal);
    console.log('user config local loaded successfully');
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.warn('user config local not found');
    } else {
      throw err;
    }
  }
}

config.root = path.join(__dirname, '..', '..');
module.exports = config;
