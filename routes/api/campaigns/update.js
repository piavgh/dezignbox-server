"use strict";

const mongoose = require('mongoose');
const {validationResult} = require('express-validator/check');
const Errors = require('../../../helpers/errors');

const Campaign = mongoose.model('Campaign');

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    Campaign.findById(req.params.id).then((campaign) => {
      if (!campaign) {
        return next(new Errors.NotFound);
      }

      campaign.title = req.body.title;
      campaign.description = req.body.description;
      campaign.status = req.body.status;

      campaign.save().then(() => {
        res.success({
          data: campaign
        })
      }, (err) => {
        console.log(err);
        next(err);
      });
    }, next);
  } else {
    next(result.array());
  }
};
