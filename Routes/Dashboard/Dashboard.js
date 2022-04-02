const Express = require('express')
const Router = Express.Router()
const Leads = require('./Leads/Leads')
const Tasks = require('./TaskFlow/TaskFlow')

Router.use('/Tasks', Tasks)
Router.use('/Leads', Leads)

module.exports = Router
