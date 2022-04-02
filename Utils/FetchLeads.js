const leadModel = require('../models/leadModel')

const fetchLeads = async (res) => {
  try {
    let leads = await leadModel.find()
    res.send({ status: 200, data: leads })
  } catch (err) {
    console.log(err.message)
    res.status(400).send('Please contact Devs')
  }
}

const fetchLead = async (req, res) => {
  try {
    let lead = await leadModel.findOne({ userName: req.params.userName })
    if (lead === null) {
      throw new Error('No such Entry found')
    }
    res.send({ status: 200, data: lead })
  } catch (error) {
    console.log(error.message)
    res.send({
      status: 400,
      message: error.message,
    })
  }
}

module.exports = {
  fetchAllLeads: fetchLeads,
  fetchOneLead: fetchLead,
}
