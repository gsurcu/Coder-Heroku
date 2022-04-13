const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  author: {
    email: {type: String},
    nombre: {type: String},
    apellido: {type: String},
    edad: {type: Number},
    alias: {type: String},
    avatar: {type: String}
  },
  text: {type: String}
})

module.exports = ChatSchema;