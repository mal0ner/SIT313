const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');

//init dotenv
require('dotenv').config({ path: '../../.env' });

//init sgMail
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(cors());
app.use(express.static(process.env.STATIC_DIR));
app.use(bodyParser.json());

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
  console.log(recipient);
  await sendMail({
    to: recipient,
    from: 'gegemalone@gmail.com',
    subject: 'Welcome!',
    text: "Welcome to the DevLink Marketplace Daily Insider's newsletter, we hope you have an amazing experience",
  });
}

//listen for post-req from html form input
app.post('/sign-up', function (request, response) {
  //body-parser gives us convenient access to body.<field> from form
  sendWelcomeEmail(request.body.email);
  response.sendStatus(200);
});

app.listen(5252, () => {
  console.log('Node server listening on http://localhost:5252');
});
