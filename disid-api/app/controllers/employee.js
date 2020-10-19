'use strict';

const employeeModel = require('../models/employee');

async function getEmployees(req, res) {
  const employees = await employeeModel.get();
  if (!req) {
    return employees;
  }

  return res.send(employees);
}

exports.get = getEmployees;

async function createEmployee(req, res) {
  let employee = req.body;

  if (!employee.name) {
    return res.status(400).send('Name can not be empty');
  }

  if (!employee.lastName) {
    return res.status(400).send('Last name can not be empty');
  }

  employee = await employeeModel.create(employee);
  return res.send(employee);
}

exports.create = createEmployee;

async function updateEmployee(req, res) {
  const employee = await employeeModel.update(req.body);
  return res.send(employee);
}

exports.update = updateEmployee;

async function deleteEmployee(req, res) {
  const employee = await employeeModel.delete(req.params.id);
  return res.send(employee);
}

exports.delete = deleteEmployee;
