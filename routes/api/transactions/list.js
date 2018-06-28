"use strict";

const paginate = require('express-paginate');
const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

module.exports = (req, res, next) => {
  try {
    Promise.all([
      Transaction.find({
        owner: req.query.userId
      }).select('transactionId numberOfItems status createdAt updatedAt')
        .populate('campaign', 'title canvasDataUrl')
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Transaction.count({
        owner: req.query.userId
      })
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
