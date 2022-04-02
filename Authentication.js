require('dotenv').config()

const adminModel = require('./models/adminModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const Authentication = async (req, res, next) => {
  if (!req.headers.authtoken) {
    res.status(401).send({ auth: false, message: 'No token provided.' })
  } else {
    try {
      await JWT.verify(req.headers.authtoken, process.env.secret)
      next()
    } catch (err) {
      console.log(err.message)
      res.status(401).send({
        status: 401,
        auth: false,
        data: 'Failed to authenticate token',
      })
    }
  }
}

const Authorization = async (req, res, next) => {
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
        res.send({ status: 200, auth: true, token })
      } else {
        throw new Error('Invalid Email or Password')
      }
    }
  } catch (err) {
    console.log(err.message)
    res.status(401).send({ status: 401, auth: false, data: err.message })
  }
}

const Logout = async (req, res, next) => {
  try {
    await JWT.verify(req.headers.authtoken, process.env.secret)
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
