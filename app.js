require('dotenv').config()

const Express = require('express')
const app = Express()
const RouteHandling = require('./RouteHandling')
const portNumber = process.env.PORT_NUMBER || 8000 || process.env.PORT
const dbConnection = require('./mongoDB/DBConnection')
const db = dbConnection.connection

app.use(RouteHandling)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(portNumber, () => {
  console.log(`running on ${portNumber}`)
})

module.exports = app
