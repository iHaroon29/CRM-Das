const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const leadSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
  },
  interests: String,
  situation: String,
  comment: String,
})

module.exports = mongoose.model('Lead', leadSchema)
