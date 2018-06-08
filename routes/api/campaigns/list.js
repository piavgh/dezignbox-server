"use strict";

const paginate = require('express-paginate');
const mongoose = require('mongoose');
const Campaign = mongoose.model('Campaign');

module.exports = (req, res, next) => {
    try {
        Promise.all([
            Campaign.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
            Campaign.count({})
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
