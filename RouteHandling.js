const Express = require('express')
const router = Express.Router()
const {
  isAuthenticated,
  isAuthorized,
  hasLoggedOut,
} = require('./Authentication')
const storeLeads = require('./Utils/StoreLeads')

const routerDashboard = require('./Routes/Dashboard/Dashboard')

router.use(Express.json())

router.use('/Admin/login', isAuthorized)

router.use('/Admin/Dashboard', routerDashboard)

// router.post('/Admin/LeadSave', storeLeads)

router.post('/User/LeadSave', storeLeads)

router.get('/Admin/logout', hasLoggedOut)

module.exports = router
