const Express = require('express')
const { isAuthenticated } = require('../../../Authentication')
const Router = Express.Router()
const createTaskFlow = require('../../../Utils/TaskFlow/CreateTaskFlow')
const { fetchedTask } = require('../../../Utils/TaskFlow/ViewTaskFlow')

Router.route('/createTaskFlow').post(
  isAuthenticated,
  async (req, res, next) => {
    await createTaskFlow(req, res, next)
  }
)

Router.route('/viewTaskFlow/:applicationTaskFlowUseCase').get(
  isAuthenticated,
  async (req, res, next) => {
    await fetchedTask(req, res, next)
  }
)

module.exports = Router
