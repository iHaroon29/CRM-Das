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
    let message = await err.message
      .split('{')[1]
      .split(':')[0]
      .trim()
      .toLowerCase()
    res.send({ status: 400, message: `Unique ${message} needed` })
  }
}

module.exports = StoreLeads
