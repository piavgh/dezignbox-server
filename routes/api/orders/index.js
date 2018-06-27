const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator/check');

const createOrder = require('./create');

router.post('/', [
  body('owner', 'Owner is required').exists(),
  body('campaign', 'Campaign is required').exists(),
  body('numberOfItems', 'Number of items is required').exists(),
  body('fullName', 'Full name is required').exists(),
  body('address', 'Address is required').exists(),
  body('city', 'City is required').exists(),
  body('shippingMethod', 'Shipping Method is required').exists(),
  body('paymentMethod', 'Payment Method is required').exists(),
  body('status', 'status is required').exists()
], createOrder);

module.exports = router;
