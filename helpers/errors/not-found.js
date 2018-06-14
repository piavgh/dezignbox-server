"use strict";
var ServerError = require('./server-error');

class NotFound extends ServerError {
  constructor(message, data, code) {
    super(404, message || 'Route not found.', data, code || 11000);
  }
}

module.exports = NotFound;