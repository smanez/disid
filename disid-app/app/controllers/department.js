'use strict';

const departmentModel = require('../models/department');

async function getdepartments(req, res) {
  const departments = await departmentModel.get();
  if (!req) {
    return departments;
  }

  return res.send(departments);
}

exports.get = getdepartments;

async function createdepartment(req, res) {
  let department = req.body;

  if (!department.name) {
    return res.status(400).send('Password can not be empty');
  }

  department = await departmentModel.create(department);
  return res.send(department);
}

exports.create = createdepartment;

async function updatedepartment(req, res) {
  const id = req.params.id;
  const departmentDb = await departmentModel.getById(id);
  if (!departmentDb) {
    return res.status(404).send('department not found');
  }

  let department = req.body;
  department._id = id;
  delete department.password;

  department = await departmentModel.update(department);
  return res.send(department);
}

exports.update = updatedepartment;
