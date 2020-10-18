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
  const id = req.params.id;
  const employeeDb = await employeeModel.getByName(id);
  if (!employeeDb) {
    return res.status(404).send('Employee not found');
  }

  let employee = req.body;
  employee._id = id;
  delete employee.password;


  employee = await employeeModel.update(employee);
  return res.send(employee);
}

exports.update = updateEmployee;
