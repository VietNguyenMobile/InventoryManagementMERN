const express = require("express");
const router = express.Router();
const errorHandler = require("../middleWare/errorMiddleWare");
const protect = require("../middleWare/authMiddleWare");

const {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
} = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/loggedIn", loginStatus);

// Error Middleware
router.use(errorHandler);
module.exports = router;
