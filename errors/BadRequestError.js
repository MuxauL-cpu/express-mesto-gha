const { BadRequest } = require('../utils/errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BadRequest;
  }
}

module.exports = BadRequestError;
