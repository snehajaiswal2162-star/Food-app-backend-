const express = require ("express");
const {
  adminLogin,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  isAuth
} = require ("../controller/authController.js");
const { protect } = require ("../middleware/authMiddleware.js");
const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/logout", logoutUser);
authRoutes.get("/profile", protect, getProfile);
authRoutes.get("/is-Auth", protect, isAuth);

module.exports = authRoutes;