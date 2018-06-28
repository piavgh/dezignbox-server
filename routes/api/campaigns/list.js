"use strict";

const paginate = require('express-paginate');
const mongoose = require('mongoose');
const Campaign = mongoose.model('Campaign');

module.exports = (req, res, next) => {
  try {
    Promise.all([
      Campaign.find({
        owner: req.query.userId,
        status: {
          $ne: 9
        }
      }).select('title status canvasDataUrl').limit(req.query.limit).skip(req.skip).lean().exec(),
      Campaign.count({
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
