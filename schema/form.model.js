const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
  formId: String,
  age: String,
  gender: String,
  email: String,
})

module.exports = mongoose.model('Form', formSchema)