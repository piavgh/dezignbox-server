"use strict";

const paginate = require('express-paginate');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

module.exports = (req, res, next) => {
  try {
    Promise.all([
      Order.find({
        owner: req.query.userId
      }).select('numberOfItems fullName address city shippingMethod paymentMethod status createdAt').limit(req.query.limit).skip(req.skip).lean().exec(),
      Order.count({
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
