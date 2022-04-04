const Express = require('express')
const { hasLoggedOut } = require('../../Authentication')
const Router = Express.Router()
const Leads = require('./Leads/Leads')
const Tasks = require('./TaskFlow/TaskFlow')

Router.use('/Tasks', Tasks)
Router.use('/Leads', Leads)
Router.use('/Logout', hasLoggedOut)

module.exports = Router
