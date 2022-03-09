require('dotenv').config()

const Express = require('express')
const app = Express()
const RouteHandling = require('./RouteHandling')
const portNumber = process.argv[2] || process.env.PORT_NUMBER || 8000
const dbConnection = require('./mongoDB/DBConnection')
const db = dbConnection.connection

console.log('hello')

app.use(RouteHandling)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(process.env.PORT)

module.exports = app
