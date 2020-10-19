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

async function updateDepartment(req, res) {
  const department = await departmentModel.update(req.body);
  return res.send(department);
}

exports.update = updateDepartment;

async function deleteDepartment(req, res) {
  const department = await departmentModel.delete(req.params.id);
  return res.send(department);
}

exports.delete = deleteDepartment;
