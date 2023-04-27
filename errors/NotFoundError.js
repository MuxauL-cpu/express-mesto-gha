const { NotFound } = require('../utils/errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NotFound;
  }
}

module.exports = NotFoundError;
