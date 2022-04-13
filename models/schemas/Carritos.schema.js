const mongoose = require('mongoose');

const Schema = mongoose.Schema
const CarritosSchema = new Schema({
  carritos: { type:Array, required:true }
})

module.exports = CarritosSchema;