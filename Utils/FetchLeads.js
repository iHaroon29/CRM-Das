const leadModel = require('../models/leadModel')

const fetchLeads = async (req, res, next) => {
  try {
    let leads = await leadModel.find()
    res.send({ status: 200, data: leads })
  } catch (err) {
    console.log(err.message)
    res.status(400).send('Please contact Devs')
  }
}

const fetchLead = async (req, res, next) => {
  try {
    let lead = await leadModel.findOne({ userName: req.params.userName })
    res.send({ status: 200, data: lead })
  } catch (error) {
    console.log(error.message)
    res.status(400).send('Please contact Devs')
  }
}

module.exports = {
  fetchAllLeads: fetchLeads,
  fetchOneLead: fetchLead,
}
