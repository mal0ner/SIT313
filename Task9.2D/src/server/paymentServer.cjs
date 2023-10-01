const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: '../../.env' });
const app = express();

app.use(cors());
app.use(express.static(process.env.STATIC_DIR));

const stripeInst = require('stripe')(process.env.STRIPE_SECRET_TEST);

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.PUBLISHABLE_STRIPE_KEY,
  });
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripeInst.paymentIntents.create({
      currency: 'aud',
      amount: 2000,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

app.listen(5252, () => {
  console.log('Node server listening on http://localhost:5252');
});
