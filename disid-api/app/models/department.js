'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const departamentoSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const departmentModel = mongoose.model('Department', departamentoSchema);

async function getDepartment() {
  return departmentModel.find().lean().exec();
}

exports.get = getDepartment;

async function getDepartamentoById(id) {
  const query = {
    _id: id,
  };

  return departmentModel.findOne(query).lean().exec();
}

exports.getById = getDepartamentoById;

async function getDepartmentByName(name) {
  const query = {
    name,
  };

  return departmentModel.find(query).lean().exec();
}

exports.getBytoName = getDepartmentByName;

async function createDepartment(departamento) {
  departamento.creationDate = new Date();
  return departmentModel.create(departamento);
}

exports.create = createDepartment;

async function updateDepartment(departamento) {
  const query = {
    _id: departamento._id,
  };

  const params = {};


  if (departamento.password) {
    params.$set.password = departamento.password;
  }

  return departmentModel.findOneAndUpdate(query, params, { new: true }).lean().exec();
}

exports.update = updateDepartment;

async function deleteDepartment(department) {
  const query = {
    _id: department,
  };
  return departmentModel.remove(query).lean().exec();
}

exports.delete = deleteDepartment;
