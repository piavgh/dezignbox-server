"use strict";

const paginate = require('express-paginate');
const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

module.exports = (req, res, next) => {
  try {
    Promise.all([
      Transaction.find().select('transactionId numberOfItems status createdAt updatedAt')
        .populate('campaign', 'title canvasDataUrl')
        .populate('owner', 'email')
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Transaction.count()
    ]).then((response) => {
      const results = response[0];
      const itemCount = response[1];
      const pageCount = Math.ceil(itemCount / req.query.limit);

      res.success(results, {
        hasMore: paginate.hasNextPages(req)(pageCount),
        pageCount
      });
    });
  } catch (err) {
    next(err);
  }
};
