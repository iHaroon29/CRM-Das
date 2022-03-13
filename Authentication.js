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
      res.send({
        status: 500,
        auth: false,
        data: 'Failed to authenticate token',
      })
    }
  }
}

const Authorization = async (req, res, next) => {
  // let hashValue = await bcrypt.hash(req.body.password, 10)
  // let record = new adminModel({
  //   email: req.body.email,
  //   password: hashValue,
  // })

  // await record.save()

  try {
    let record = await adminModel.findOne({
      email: req.body.email,
    })
    if (record !== null) {
      let verify = await bcrypt.compare(req.body.password, record.password)

      if (verify) {
        let token = await JWT.sign({ id: record._id }, process.env.secret, {
          expiresIn: 86400,
        })
        res.send({ status: 200, auth: true, token })
      } else {
        res.send({
          status: 400,
          auth: false,
          data: 'Invalid Email or Password',
        })
      }
    } else {
      res.send({ status: 400, auth: false, data: 'Invalid Email or Password' })
    }
  } catch (error) {
    console.log(error.message)
  }
}

const Logout = async (req, res, next) => {
  try {
    ;(await JWT.verify(req.headers.authtoken, process.env.secret))
      ? res.send({ canLogout: 'true', data: { token: '' } })
      : res.send({
          canLogout: 'false',
          data: { message: "Can't log-out, Contact Devs please" },
        })
  } catch (err) {
    console.log(err.message)
    res.send({
      status: 500,
      canLogout: false,
      data: 'Failed to authenticate token',
    })
  }
}

module.exports = {
  isAuthenticated: Authentication,
  isAuthorized: Authorization,
  hasLoggedOut: Logout,
}
