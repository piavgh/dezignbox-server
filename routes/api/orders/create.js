"use strict";

const mongoose = require('mongoose');
const {validationResult} = require('express-validator/check');

const Order = mongoose.model('Order');

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    let order = new Order({
      owner: req.body.owner,
      campaign: req.body.campaign,
      numberOfItems: req.body.numberOfItems,
      fullName: req.body.fullName,
      address: req.body.address,
      city: req.body.city,
      shippingMethod: req.body.shippingMethod,
      paymentMethod: req.body.paymentMethod,
      status: req.body.status,
    });

    order.save().then(() => {
      res.success(order);
    }, (err) => {
      next(err);
    });
  } else {
    next(result.array());
  }
};
