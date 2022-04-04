const Express = require('express')
const Router = Express.Router()
const StoreLeads = require('../../Utils/Leads/StoreLeads')
const { verifyOtp } = require('../../services/Otp')

Router.post('/LeadSave', StoreLeads)
Router.post('/OTPVerify', verifyOtp)

module.exports = Router
