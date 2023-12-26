class customeError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (message, statusCode) => {
  return new customeError(message, statusCode);
};

module.exports = { customeError, createError };
