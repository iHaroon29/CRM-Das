const mongoose = require('mongoose')
const { Schema } = mongoose

const tokenSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  timeLoggedIn: {
    type: String,
  },
})

module.exports = mongoose.model('Token', tokenSchema)
