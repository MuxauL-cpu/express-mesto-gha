const { Forbidden } = require('../utils/errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Forbidden;
  }
}

module.exports = ForbiddenError;
