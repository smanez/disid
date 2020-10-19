'use strict';

const asyncHandler = require('express-async-handler');
const auth = require('../../config/middleware/authorization');
const employeesController = require('../controllers/employee');

module.exports = (app) => {
  app.get('/api/employee', auth, asyncHandler(employeesController.get));
  app.post('/api/employee', auth, asyncHandler(employeesController.create));
  app.put('/api/employee/:id', auth, asyncHandler(employeesController.update));
  app.delete('/api/employee/:id', auth, asyncHandler(employeesController.delete));
};
