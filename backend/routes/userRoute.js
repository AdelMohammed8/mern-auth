const express = require("express");
const {
  updateProfile,
  getUserProfile,
  logoutUser,
  authUser,
  registerUser,
} = require("../controllers/userController");
const protect = require("../middleware/authMidleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile",protect, getUserProfile);
router.put("/profile",  updateProfile);

module.exports = router;
