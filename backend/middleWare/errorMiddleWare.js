const dotenv = require("dotenv");
dotenv.config();

const errorHandler = (err, req, res, next) => {
  // const messageError = err.message;
  // // format of error
  // const error = {
  //   status: "Error",
  //   error: messageError,
  // };
  // const status = 400
  // return res.status(status).json(error);

  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  return res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });

  // return .json({ message: err.message });
};

module.exports = errorHandler;
