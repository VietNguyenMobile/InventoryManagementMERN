const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

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
  console.log("New user created: ", user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // token: generateToken(user._id),
      photo: user.photo,
      bio: user.bio,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = { registerUser };
