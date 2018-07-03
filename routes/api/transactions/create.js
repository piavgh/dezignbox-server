"use strict";

const mongoose = require('mongoose');
const {validationResult} = require('express-validator/check');

const Transaction = mongoose.model('Transaction');

const generateTransactionId = require('../../../helpers/utils/generate-transaction-id');

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    let transaction = new Transaction({
      transactionId: generateTransactionId(),
      owner: req.body.owner,
      campaign: req.body.campaign,
      numberOfItems: req.body.numberOfItems,
      fullName: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      shippingMethod: req.body.shippingMethod,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status,
    });

    transaction.save().then(() => {
      res.success(transaction);
    }, (err) => {
      next(err);
    });
  } else {
    next(result.array());
  }
};
