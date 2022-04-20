const Express = require('express')
const { isAuthorized } = require('../../Authentication')

const Router = Express.Router()
const Dashboard = require('../Dashboard/Dashboard')

Router.use('/Dashboard', Dashboard)
Router.use('/login', isAuthorized)

module.exports = Router
