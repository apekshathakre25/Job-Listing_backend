const jwt = require("jsonwebtoken");
const secretKey = "$!KKLfc%5";
const User = require("../models/job");

const verifyJwt = (req, res, next) => {
  try {
    const reqHeader = req.header("Authorization").split(" ");
    const token = reqHeader[1];
    // const token = req.cookies.token;
    if (!token) {
      res.status(404).json({ errorMessage: "Invalid Token" });
    }
    const decode = jwt.verify(token, secretKey);

    const isUserValid = User.findById(decode.userId);

    if (!isUserValid) {
      res.status(404).json({ errorMessage: "Invalid Access" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Token Request Failed" });
  }
};

module.exports = verifyJwt;
