"use strict";

const mongoose = require('mongoose');
const Campaign = mongoose.model('Campaign');
const Errors = require('../../../helpers/errors');

module.exports = (req, res, next) => {
  try {
    Campaign.findByIdAndRemove(req.params.id)
      .then((campaign) => {
        if (!campaign) {
          return next(new Errors.NotFound);
        }

        res.success(campaign);
      }, next)
  } catch (err) {
    next(err);
  }
};
