const express = require("express");
const router = express.Router();
const errorHandler = require("../middleWare/errorMiddleWare");

const { registerUser, loginUser } = require("../controllers/UserController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Error Middleware
router.use(errorHandler);
module.exports = router;
