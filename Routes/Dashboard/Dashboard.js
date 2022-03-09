const Express = require('express')
const Router = Express.Router()
const Leads = require('./Leads/Leads')

Router.use(`/Leads`, Leads)

module.exports = Router
