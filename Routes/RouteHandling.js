const Express = require('express')
const router = Express.Router()
const cors = require('cors')
const AdminRoutes = require('./Admin/AdminRoutes')
const UserRoutes = require('./User/UserRoutes')
router.use(cors())
router.use(Express.json())

router.use('/Admin', AdminRoutes)
router.post('/User', UserRoutes)

module.exports = router
