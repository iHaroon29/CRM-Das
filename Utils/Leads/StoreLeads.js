const leadModel = require('../..//models/leadModel')
const { generateOtp, sendOtp } = require('../../services/Otp')

const StoreLeads = async (req, res, next) => {
  let newLead = new leadModel({
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    qualification: req.body.qualification,
    situation: 'Registered',
    comment: '',
    otp: await generateOtp(),
    otpVerified: false,
  })

  try {
    if (await newLead.save()) {
      await sendOtp(req.body.phoneNumber, newLead.otp)
      res.send({
        status: 200,
        message: 'OTP has been sent to your mobile phone.',
        userName: req.body.userName,
      })
    }
  } catch (err) {
    console.log(err.message)
    let message = await /userName|phoneNumber|email/
      .exec(err.message)[0]
      .toLowerCase()
    res.send({ status: 400, message: `Unique ${message} needed!` })
  }
}

module.exports = StoreLeads
