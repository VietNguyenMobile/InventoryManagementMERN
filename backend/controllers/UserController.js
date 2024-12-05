const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password should be at least 6 characters");
  }
  // Check if user exists in the database or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/", // root path
    expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  console.log("New user created: ", user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      photo: user.photo,
      phone: user.phone,
      bio: user.bio,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  // res.send("Login User");
  const { email, password } = req.body;
  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  // Check if user exists in the database or not
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist, please register");
  }
  // Check if password is correct
  // const isMatch = await user.matchPassword(password);
  console.log("user: ", user);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("isMatch: ", isMatch);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  // Generate token
  const token = generateToken(user._id);
  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/", // root path
    expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  console.log("User logged in: ", user);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      phone: user.phone,
      bio: user.bio,
      token
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = { registerUser, loginUser };
