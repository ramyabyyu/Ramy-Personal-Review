const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// jwt generator
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "24h" });
};

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("All Fields is Required");
  }

  //   check if username already exist
  const oldUser = await User.findOne({ username });

  if (oldUser) {
    res.status(400);
    throw new Error("Username already exist");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("All field is required");
  }

  //   check username
  const oldUser = await User.findOne({ username });

  if (!oldUser) {
    res.status(400);
    throw new Error("Username is incorrect");
  } else {
    const isPwCorrect = await bcrypt.compare(password, oldUser.password);
    if (isPwCorrect) {
      res.status(200).json({
        user: oldUser,
        token: generateToken(oldUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Password is incorrect");
    }
  }
});

module.exports = {
  register,
  login,
};
