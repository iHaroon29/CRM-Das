require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL
const mongoose = require('mongoose')

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

module.exports = mongoose
