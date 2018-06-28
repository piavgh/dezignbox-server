const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator/check');

const getTransactions = require('./list');
const createTransaction = require('./create');

router.get('/', [
  query('userId', 'User ID is required').exists()
], getTransactions);

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
], createTransaction);

module.exports = router;
