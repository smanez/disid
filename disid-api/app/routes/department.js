'use strict';

const asyncHandler = require('express-async-handler');
const auth = require('../../config/middleware/authorization');
const departmentController = require('../controllers/department');

module.exports = (app) => {
  app.get('/api/department', auth, asyncHandler(departmentController.get));
  app.post('/api/department', auth, asyncHandler(departmentController.create));
  app.put('/api/department/:id', auth, asyncHandler(departmentController.update));
  app.delete('/api/department/:id', auth, asyncHandler(departmentController.delete));
};
