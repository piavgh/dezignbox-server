"use strict";

const mongoose = require('mongoose');
const {validationResult} = require('express-validator/check');

const Campaign = mongoose.model('Campaign');

module.exports = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    let campaign = new Campaign({
      title: req.body.title,
      description: req.body.description,
      active: true,
      owner: req.body.owner,
      canvasDataUrl: req.body.canvasDataUrl,
      originalImageUrl: req.body.originalImageUrl,
      thumbnailImageUrl: req.body.thumbnailImageUrl,
    });

    campaign.save().then(() => {
      res.success(campaign);
    }, (err) => {
      next(err);
    });
  } else {
    next(result.array());
  }
};
