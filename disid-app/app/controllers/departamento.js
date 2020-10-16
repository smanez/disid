'use strict';

const empleadoModel = require('../models/empleado');

async function getEmpleados(req, res) {
  const departamentos = await empleadoModel.get();
  if (!req) {
    return departamentos;
  }

  return res.send(departamento);
}

exports.get = getEmpleados;

async function createDepartamento(req, res) {
  let departamento = req.body;

  if (!departamento.pass) {
    return res.status(400).send('Password can not be empty');
  }

  if (!departamento.email) {
    return res.status(400).send('Email can not be empty');
  }

  departamento = await empleadoModel.create(departamento);
  return res.send(departamento);
}

exports.create = createDepartamento;

async function updateDepartamento(req, res) {
  const id = req.params.id;
  const departamentoDb = await empleadoModel.getById(id);
  if (!departamentoDb) {
    return res.status(404).send('Departamento not found');
  }

  let departamento = req.body;
  departamento._id = id;
  delete departamento.password;

  departamento = await empleadoModel.update(departamento);
  return res.send(departamento);
}

exports.update = updateDepartamento;
