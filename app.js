require('dotenv').config()

const Express = require('express')
const app = Express()
const RouteHandling = require('./RouteHandling')
const portNumber = process.env.PORT_NUMBER || process.argv[2] || 8000
const dbConnection = require('./mongoDB/DBConnection')
const db = dbConnection.connection

app.use(RouteHandling)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(portNumber, () => {
  console.log('listening at 8000')
})

module.exports = app
