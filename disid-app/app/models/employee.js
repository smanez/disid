'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const empleadoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  fechaAlta: {
    type: Date,
    default: true,
  },
  department: {
    type: 'ObjectId',
    ref: 'Department',
    required: true,
  },
});

const empleadoModel = mongoose.model('Employee', empleadoSchema);

async function getEmpleados() {
  return empleadoModel.find().populate('department').lean().exec();
}

exports.get = getEmpleados;

async function getEmpleadoById(id) {
  const query = {
    _id: id,
  };

  return empleadoModel.findOne(query).lean().exec();
}

exports.getById = getEmpleadoById;

async function createEmpleado(empleado) {
  return empleadoModel.create(empleado);
}

exports.create = createEmpleado;

async function updateEmpleado(empleado) {
  const query = {
    _id: empleado._id,
  };

  const params = {};

  if (empleado.password) {
    params.$set.password = empleado.password;
  }

  return empleadoModel.findOneAndUpdate(query, params, { new: true }).lean().exec();
}

exports.update = updateEmpleado;
