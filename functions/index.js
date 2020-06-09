const functions = require('firebase-functions');

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');


var transport = nodemailer.createTransport({
    host: "smtp-pulse.com",
    port: 2525,
    auth: {
      user: "bogdanzaliskiy@gmail.com",
      pass: "2StYDgQ3B9CDYnF"
    }
  });

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `

  var mail = {
    from: "contact@zaliskyi.online",
    to: 'contact@zaliskyi.online',  // Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  transport.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3002)
exports.app = functions.https.onRequest(app);


