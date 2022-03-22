const leadModel = require('../models/leadModel')

const updateLead = async (req, res, next) => {
  try {
    let updatedLead = await leadModel.findOneAndUpdate(
      { userName: req.params.userName },
      { situation: req.body.situation, comment: req.body.comment },
      {
        new: true,
      }
    )
    res.send({ status: 200, message: updatedLead })
  } catch (err) {
    console.log(err.message)
    res.status(400).send('Lead not updated, Contact Devs')
  }
}

module.exports = updateLead
