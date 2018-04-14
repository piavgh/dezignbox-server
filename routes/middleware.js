"use strict";

const utils = require('../helpers/utils/index');

var Errors = require('../helpers/errors/index');
module.exports = {
    start: function (req, res, next) {
        res.setTimeout(60 * 1000, function () {
            console.log('Request has timed out.');
            res.error({status: 408, message: 'Timeout Error'});
        });

        req.isAuthenticated = function () {
            return !!req.session.user;
        };
        req.checkRequiredFields = function (fields, checker) {
            for (let i = 0; i < fields.length; i++) {
                req[checker || 'check'](fields[i], 'required').notEmpty();
            }
        };

        res.success = function (data, extra) {
            res.contentType('application/json');
            req.isHandled = true;
            return res.send({
                success: true,
                data: data,
                extra: extra
            });
        };

        res.error = function (error) {
            res.contentType('application/json');
            req.isHandled = true;
            return res.status(error.status || 500).send({
                success: false,
                error: error
            });
        };

        let objects = [req.body, req.query, req.params];
        for (let i = 0; i < objects.length; i++) {
            for (let key in objects[i]) {
                if (objects[i].hasOwnProperty && objects[i].hasOwnProperty(key) && typeof objects[i][key] === 'string') {
                    objects[i][key] = utils.removeNonUTF8(objects[i][key]);
                }
            }
        }
        next();
    },
    end: function (req, res, next) {
        if (!req.isHandled) {
            res.error(new Errors.NotFound('Route not found', {}, 11000))
        }
        res.end();
    },
    error: function (err, req, res, next) {
        if (err.status !== 401) {
            console.log('server error', req.path, err);
        }
        req.isHandled = true;
        res.error(err);
    }
};
