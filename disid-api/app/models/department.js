'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const departmentModel = mongoose.model('Department', departmentSchema);

async function getDepartment() {
  return departmentModel.find().lean().exec();
}

exports.get = getDepartment;

async function getDepartmentById(id) {
  const query = {
    _id: id,
  };

  return departmentModel.findOne(query).lean().exec();
}

exports.getById = getDepartmentById;

async function getDepartmentByName(name) {
  const query = {
    name,
  };

  return departmentModel.find(query).lean().exec();
}

exports.getBytoName = getDepartmentByName;

async function createDepartment(department) {
  department.creationDate = new Date();
  return departmentModel.create(department);
}

exports.create = createDepartment;

async function updateDepartment(department) {
  const query = {
    _id: department._id,
  };

  const params = {
    $set:{},
  };


  if (department.name) {
    params.$set.name = department.name;
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
