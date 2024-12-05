const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password should be at least 6 characters"],
      maxLength: [23, "Password should not be more than 23 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: { type: String, default: "+84" },
    bio: {
      type: String,
      default: "bio",
      maxLength: [250, "Bio should not be more than 250 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
