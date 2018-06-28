"use strict";

const mongoose = require('mongoose');
const Campaign = mongoose.model('Campaign');
const Errors = require('../../../helpers/errors');

module.exports = (req, res, next) => {
  try {
    Campaign.findById(req.params.id)
      .then((campaign) => {
        if (!campaign) {
          return next(new Errors.NotFound);
        }

        if (campaign.status === 9) {
          return next(new Errors.BadRequest('Campaign is deleted'));
        }

        res.success(campaign);
      }, next)
  } catch (err) {
    next(err);
  }
};
