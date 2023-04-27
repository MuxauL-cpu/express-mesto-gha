const NotFound = 404;
const BadRequest = 400;
const ServerError = 500;

const regexUrl = /^https?:\/\/(www\.)?[a-zA-Z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/i;

module.exports = {
  NotFound,
  BadRequest,
  ServerError,
  regexUrl,
};
