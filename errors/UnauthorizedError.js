const { AuthError } = require('../utils/errors');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AuthError;
  }
}

module.exports = UnauthorizedError;
