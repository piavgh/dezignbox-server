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

        campaign.status = 9; // Set campaign status to deleted

        campaign.save(() => {
          res.success(campaign);
        }, next);
      }, next)
  } catch (err) {
    next(err);
  }
};
