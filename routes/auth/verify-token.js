"use strict";

const jwt = require('jsonwebtoken');

const User = require("../../models/User");

module.exports = (req, res) => {
    // check header for token
    if (!req.headers['authorization']) {
        return res.status(401).json({message: "There is no token"});
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers['authorization'].split(' ')[1];

    // Check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        // the 401 code is for unauthorized status
        if (err) {
            return res.status(401).end();
        }

        //return user using the id from within JWT
        User.findById({
            "_id": user.sub
        }, function (err, user) {
            if (err) throw err;
            // user = utils.getCleanUser(user);
            //Note: you can renew token by creating new token(i.e.
            //refresh it)w/ new expiration time at this point, but I’m
            //passing the old token back.
            // var token = utils.generateToken(user);
            res.json({
                user: user,
                token: token
            });
        });
    });
};
