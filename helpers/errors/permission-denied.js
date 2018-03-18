"use strict";
var ServerError = require('./server-error');

class PermissionDenied extends ServerError{
    constructor(message, data, code){
        super(550, message || 'Permission Denied', data, code || 2100);
    }
}

module.exports = PermissionDenied;