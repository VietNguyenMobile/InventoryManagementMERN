const registerUser = async (req, res) => {
  if (!req.body.email) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  res.send("Register User");
};

module.exports = { registerUser };
