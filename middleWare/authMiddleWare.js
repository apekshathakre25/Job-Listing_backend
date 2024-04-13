const jwt = require("jsonwebtoken");
const secretKey = "$!KKLfc%5";
const User = require("../models/job");

const verifyJwt = (req, res, next) => {
  try {
    const reqHeader = req.header("authorization").split(" ");
    const token = reqHeader[1];

    if (!token) {
      res.status(404).json({ errorMessage: "Invalid Token" });
    }
    const decode = jwt.verify(token, secretKey);
    req.userId = decode.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token Request Failed" });
  }
};

module.exports = verifyJwt;
