'use strict';

const asyncHandler = require('express-async-handler');
const auth = require('../../config/middleware/authorization');
const departamentoController = require('../controllers/departamento');

module.exports = (app) => {
  app.get('/api/departamento', auth, asyncHandler(departamentoController.get));
  app.post('/api/departamento', auth, asyncHandler(departamentoController.create));
  app.put('/api/departamento/:id', auth, asyncHandler(departamentoController.update));
};
