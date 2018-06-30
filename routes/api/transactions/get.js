"use strict";

const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');
const Errors = require('../../../helpers/errors');

module.exports = (req, res, next) => {
  try {
    Transaction.findById(req.params.id)
      .then((transaction) => {
        if (!transaction) {
          return next(new Errors.NotFound);
        }

        if (transaction.status === 9) {
          return next(new Errors.BadRequest('Transaction is deleted'));
        }

        res.success(transaction);
      }, next)
  } catch (err) {
    next(err);
  }
};
