const { createError } = require("../middleware/customerror");
const User = require("../modals/userModal");
const generateToken = require("../utils/generateToken");
const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return next(createError("Invalid email or password", 401));
  }
};
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(createError("User already exist", 400));
  }
  let newuser = await User.create({
    name,
    email,
    password,
  });
  if (newuser) {
    generateToken(res, newuser._id);
    res.status(201).json({
      id: newuser._id,
      name: newuser.name,
      email: newuser.email,
    });
  } else {
    return next(createError("Invalid user data", 400));
  }
};
const getUserProfile = async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
};
const updateProfile = async (req, res, next) => {
  const user = await User.findById(req.body._id);
  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    return next(createError("user not found", 404));
  }
};
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "loggedout" });
};

module.exports = {
  updateProfile,
  getUserProfile,
  logoutUser,
  authUser,
  registerUser,
};
