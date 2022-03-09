const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const adminSchema = new Schema({
  userID: {
    type: String,
    unique: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
})

module.exports = mongoose.model('Admin', adminSchema)
