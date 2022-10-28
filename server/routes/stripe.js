const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_key);

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd',
    },
    (stripeErr, stripRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripRes);
      }
    },
  );
});

module.exports = router;
