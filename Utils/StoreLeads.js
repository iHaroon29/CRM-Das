const leadModel = require('../models/leadModel')

const StoreLeads = async (req, res, next) => {
  let newLead = new leadModel({
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    interests: req.body.interests,
    situation: 'Registered',
    comment: '',
  })
  try {
    await newLead.save()
    res.send({ status: 200, message: 'Lead Saved' })
  } catch (err) {
    console.log(err.message)
    res.send({ status: 400, message: 'Lead not Saved' })
  }
}

module.exports = StoreLeads
