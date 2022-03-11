const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
    lowercase: true,
  },
  password: {
    type: String,
  },
})

module.exports = mongoose.model('Admin', adminSchema)
