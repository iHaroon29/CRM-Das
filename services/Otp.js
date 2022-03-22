require('dotenv').config()

const otpGenerator = require('otp-generator')
const leadModel = require('../models/leadModel')
const fastTwoSms = require('fast-two-sms')

// OPT Generation

const otpGeneration = async () => {
  let otp = await otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  })
  return otp
}

// OTP Sending

const sendingOtp = async (contactNumber, otp) => {
  try {
    let response = await fastTwoSms.sendMessage({
      authorization: process.env.F2S_APIKEY,
      message: `Your OTP:${otp}`,
      numbers: [contactNumber],
    })
    if (response.return === false) {
      throw new Error(response.message)
    }
  } catch (e) {
    res.status(400).send(e.message)
  }
}

// OTP Verification

const otpVerification = async (req, res, next) => {
  const { userName, otp } = req.body
  try {
    let record = await leadModel.findOne({ userName: userName })
    if (record.otp !== otp) {
      throw new Error('OTP invalid, Please enter valid OTP.')
    }
    await leadModel.findOneAndUpdate(
      { userName: userName },
      { otpVerified: true }
    )
    res.send({
      status: 200,
      message:
        'Thank you for registering, our Specialist will get in touch soon!',
    })
  } catch (err) {
    res.status(400).send(err.message)
  }
}

module.exports = {
  generateOtp: otpGeneration,
  verifyOtp: otpVerification,
  sendOtp: sendingOtp,
}
