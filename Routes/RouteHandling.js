const Express = require('express')
const Router = Express.Router()
const cors = require('cors')
const AdminRoutes = require('./Admin/AdminRoutes')
const UserRoutes = require('./User/UserRoutes')
Router.use(cors())
Router.use(Express.json())

Router.use('/Admin', AdminRoutes)
Router.use('/User', UserRoutes)

module.exports = Router
