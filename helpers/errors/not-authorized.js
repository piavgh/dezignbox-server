"use strict";
var ServerError = require('./server-error');

class NotAuthorized extends ServerError{
    constructor(message, data, code){
        super(401, message || 'Not Authorized',data, code || 2000);
    }
}

module.exports = NotAuthorized;