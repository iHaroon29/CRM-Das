require('dotenv').config()

const adminModel = require('./models/adminModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const tokenModel = require('./models/tokenModel')

const Authentication = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    if (!authorization) {
      throw new Error('No token provided')
    }
    let tokenRecord = await tokenModel.findOne({ authorization })
    if (tokenRecord === null) {
      throw new Error('Session Invalid')
    }
    await JWT.verify(authorization, process.env.secret)
    next()
  } catch (err) {
    console.log(err.message)
    res.status(401).send({
      auth: false,
      message: err.message,
    })
  }
}

const Authorization = async (req, res) => {
  try {
    let record = await adminModel.findOne({
      email: req.body.email,
    })
    if (record === null) {
      throw new Error('Invalid Email or Password')
    } else {
      let verify = await bcrypt.compare(req.body.password, record.password)
      if (verify) {
        let token = await JWT.sign({ id: record._id }, process.env.secret, {
          expiresIn: 86400,
        })
        await new tokenModel({
          userName: req.body.email,
          token: token,
        }).save()
        await res.send({ status: 200, auth: true, token })
      } else {
        throw new Error('Invalid Email or Password')
      }
    }
  } catch (err) {
    console.log(err.message)
    res.send({ status: 401, auth: false, data: err.message })
  }
}

const Logout = async (req, res) => {
  try {
    await JWT.verify(req.headers.authorization, process.env.secret)
    res.send({ canLogout: true, data: { token: '' } })
  } catch (err) {
    console.log(err.message)
    res.send({
      status: 500,
      canLogout: false,
      data: "Can't log-out, Contact Devs please",
    })
  }
}

module.exports = {
  isAuthenticated: Authentication,
  isAuthorized: Authorization,
  hasLoggedOut: Logout,
}
