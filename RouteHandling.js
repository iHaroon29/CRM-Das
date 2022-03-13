const Express = require('express')
const router = Express.Router()
const {
  isAuthenticated,
  isAuthorized,
  hasLoggedOut,
} = require('./Authentication')
const storeLeads = require('./Utils/StoreLeads')
const cors = require('cors')

const routerDashboard = require('./Routes/Dashboard/Dashboard')
router.use(cors())
router.use(Express.json())

router.use('/Admin/login', isAuthorized)

router.use('/Admin/Dashboard', routerDashboard)

router.post('/User/LeadSave', storeLeads)

router.get('/Admin/logout', hasLoggedOut)

module.exports = router
