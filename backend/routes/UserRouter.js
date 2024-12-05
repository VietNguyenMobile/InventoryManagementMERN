const express = require("express");
const router = express.Router();
const errorHandler = require("../middleWare/errorMiddleWare");

const { registerUser } = require("../controllers/UserController");

router.post("/register", registerUser);

// Error Middleware
router.use(errorHandler);
module.exports = router;
