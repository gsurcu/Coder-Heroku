const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ProductsSchema = new Schema({
  id: mongoose.ObjectId,
  timeStamp: {type: Number, required: true},
  nombre: {type: String, required: true},
  descripcion: {type: String, required: true},
  codigo: {type: Number, required: true},
  imgUrl: {type: String, required: true},
  precio: {type: Number, required: true},
  stock: {type: Number, required: true}
})

module.exports = ProductsSchema