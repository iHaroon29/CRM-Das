const leadModel = require('../../models/leadModel')

const fetchLeads = async (req, res, next) => {
  try {
    let leads = await leadModel.find({}, { otp: 0, otpVerified: 0 })
    res.send({ status: 200, leads })
  } catch (err) {
    console.log(err.message)
    res.status(400).send('Please contact Devs')
  }
}

const fetchLead = async (req, res) => {
  try {
    let lead = await leadModel.findOne(
      { userName: req.params.userName },
      { otp: 0 }
    )
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
