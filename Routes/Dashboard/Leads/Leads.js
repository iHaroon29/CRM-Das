const Express = require('express')
const { isAuthenticated } = require('../../../Authentication')
const { fetchAllLeads, fetchOneLead } = require('../../../Utils/FetchLeads')
const updateLead = require('../../../Utils/updateLead')
const Router = Express.Router()

Router.route('/:userName').get(isAuthenticated, async (req, res, next) => {
  await fetchOneLead(req, res, next)
})

Router.route('/').get(isAuthenticated, async (req, res, next) => {
  await fetchAllLeads(req, res, next)
})

Router.route('/Update/:userName').post(
  isAuthenticated,
  async (req, res, next) => {
    await updateLead(req, res, next)
  }
)

module.exports = Router
