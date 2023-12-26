const { customeError } = require("./customerror");
const notFound = (req, res, next) => {
  res.status(404).json({ message: "not Found" });
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof customeError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: "some thing went wrong" });
};
module.exports = { notFound, errorHandler };
