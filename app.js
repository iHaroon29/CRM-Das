require('dotenv').config()

const Express = require('express')
const app = Express()
const RouteHandling = require('./RouteHandling')
const portNumber =
  process.env.PORT_NUMBER || process.argv[2] || process.env.PORT || 8000
const dbConnection = require('./mongoDB/DBConnection')
const db = dbConnection.connection

console.log('hello')

app.use(RouteHandling)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(portNumber, () => {
  console.log(`Listening at ${portNumber}`)
})

module.exports = app
