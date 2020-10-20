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

  const params = {
    $set:{},
  };

  if (empleado.name) {
    params.$set.name = empleado.name;
  }

  if (empleado.lastName) {
    params.$set.lastName = empleado.lastName;
  }

  if (empleado.age) {
    params.$set.age = empleado.age;
  }

  if (empleado.department) {
    params.$set.department = empleado.department;
  }

  return empleadoModel.findOneAndUpdate(query, params, { new: true }).lean().exec();
}

exports.update = updateEmpleado;

async function deleteEmpleados(empleado) {
  const query = {
    _id: empleado,
  };
  return empleadoModel.remove(query).lean().exec();
}

exports.delete = deleteEmpleados;
