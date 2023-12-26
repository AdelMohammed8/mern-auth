const jwt = require("jsonwebtoken");
const { createError } = require("../middleware/customerror");
const User = require("../modals/userModal");
const protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      req.user = user;

      next();
    } catch (error) {
      return next(createError("Not Authorized,invalid token", 401));
    }
  } else {
    return next(createError("Not Authorized,no token", 401));
  }
};
module.exports = protect;
