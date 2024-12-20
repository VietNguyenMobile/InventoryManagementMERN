const dotenv = require("dotenv");
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserRouter = require("./routes/UserRouter");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes Middleware
app.use("/api/users", UserRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Hello to MERN Stack");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message)); // Connect to MongoDB
