'use strict';

const empleadoModel = require('../models/empleado');

async function getEmpleados(req, res) {
  const empleados = await empleadoModel.get();
  if (!req) {
    return empleados;
  }

  return res.send(empleados);
}

exports.get = getEmpleados;

async function createEmpleado(req, res) {
  let empleado = req.body;

  if (!empleado.name) {
    return res.status(400).send('Name can not be empty');
  }

  if (!empleado.lastName) {
    return res.status(400).send('Last name can not be empty');
  }

  empleado = await empleadoModel.create(empleado);
  return res.send(empleado);
}

exports.create = createEmpleado;

async function updateEmpleado(req, res) {
  const id = req.params.id;
  const empleadoDb = await empleadoModel.getByName(id);
  if (!empleadoDb) {
    return res.status(404).send('Empleado not found');
  }

  let empleado = req.body;
  empleado._id = id;
  delete empleado.password;


  empleado = await empleadoModel.update(empleado);
  return res.send(empleado);
}

exports.update = updateEmpleado;
