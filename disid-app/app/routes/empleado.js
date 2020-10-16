'use strict';

const asyncHandler = require('express-async-handler');
const auth = require('../../config/middleware/authorization');
const empleadosController = require('../controllers/empleado');

module.exports = (app) => {
  app.get('/api/empleados', auth, asyncHandler(empleadosController.get));
  app.post('/api/empleados', auth, asyncHandler(empleadosController.create));
  app.put('/api/empleados/:id', auth, asyncHandler(empleadosController.update));
};
