const express = require("express");
const router = express.Router();
const errorHandler = require("../middleWare/errorMiddleWare");

const { registerUser, loginUser, logout } = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

// Error Middleware
router.use(errorHandler);
module.exports = router;
