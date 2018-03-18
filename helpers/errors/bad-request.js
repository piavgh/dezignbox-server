"use strict";
var ServerError = require('./server-error');

class BadRequest extends ServerError{
    constructor(message, data, code){
        super(400, message || 'Bad Request',data, code || 5000);
    }
}

module.exports = BadRequest;