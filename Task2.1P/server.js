const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
require('dotenv').config(); //init dotenv for secrets file

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const port = process.env.port || 8080; //optional .env port spec
const app = express();

//serve static files middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));

async function sendMail(msg) {
  try {
    await sgMail.send(msg);
    console.log('Message sent successfully');
  } catch (err) {
    console.error(err);
    if (err.response) {
      console.error(err.response.body);
    }
  }
}

async function sendWelcomeEmail(recipient) {
  //email template text
  await sendMail({
    to: recipient,
    from: 'gegemalone@gmail.com',
    subject: 'Welcome!',
    text: "Welcome to the DevLink Marketplace Daily Insider's newsletter, we hope you have an amazing experience",
  });
}

app.get('/', function (_, response) {
  //serve home page at root URL
  response.sendFile(path.join(__dirname, 'index.html'));
});

//listen for post-req from html form input
app.post('/sign-up', function (request, response) {
  //body-parser gives us convenient access to body.<field> from form
  sendWelcomeEmail(request.body.email);
  response.sendStatus(200);
});

app.listen(port);
