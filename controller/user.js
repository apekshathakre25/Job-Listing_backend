const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "$!KKLfc%5";

const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    console.log(name, password, email);

    if (!name || !password || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = new User({
      name,
      email,
      password: hashedPassword,
    });

    await userData.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const userDetails = await User.findOne({ email: email });

    if (!userDetails) {
      return res.status(401).json({ error: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: "password does not match" });
    }

    const token = jwt.sign({ userId: userDetails.id }, secretKey);
    res.cookie("token", token, { httpOnly: true });
    return res.json({
      success: "User logged in successfully",
      name: userDetails.name,
      token: token,
    });
  } catch (error) {
    console.error("Error in userLogin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
