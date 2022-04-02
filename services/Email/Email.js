var nodemailer = require('nodemailer')
const fs = require('fs')

const test = () => {
  const template = fs.readFileSync(
    __dirname + '/Email/EmailTemplates/emailTemplate.html',
    {
      encoding: 'utf-8',
    }
  )
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'syedharoonali.29@gmail.com',
      pass: 'rineraecllfsftzs',
    },
  })

  const mailOptions = {
    from: 'syedharoonali.29@gmail.com', // sender address
    to: '19311d7806@sreenidhi.edu.in', // list of receivers
    subject: 'test mail', // Subject line
    html: `${template}`, // plain text body
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err)
    else console.log(info)
  })
}

module.exports = test
