'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const departamentoSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  }
});

const departamentoModel = mongoose.model('departamento', departamentoSchema);

async function getDepartamento() {
  return departamentoModel.find();
}

exports.get = getDepartamento;

async function getDepartamentoById(id) {
  const query = {
    _id: id,
  };

  return departamentoModel.findOne(query).lean().exec();
}

exports.getById = getDepartamentoById;

async function getDepartamentoByName(name) {
  const query = {
    name,
  };

  return departamentoModel.findOne(query).lean().exec();
}

exports.getBydepartamentoName = getDepartamentoByName;

async function createDepartamento(departamento) {
  departamento.creationDate = new Date();
  return departamentoModel.create(departamento);
}

exports.create = createDepartamento;

async function updateDepartamento(departamento) {
  const query = {
    _id: departamento._id,
  };

  const params = {};


  if (departamento.password) {
    params.$set.password = departamento.password;
  }

  return departamentoModel.findOneAndUpdate(query, params, { new: true }).lean().exec();
}

exports.update = updateDepartamento;

