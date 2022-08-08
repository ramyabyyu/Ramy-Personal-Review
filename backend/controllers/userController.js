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
  const { username, password, gender } = req.body;

  if (!username || !password || !gender) {
    res.status(400).json("All fields is required");
  }

  //   check if username already exist
  const oldUser = await User.findOne({ username });

  if (oldUser) {
    res.status(400).json("Username already exist");
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
    gender,
  });

  if (user) {
    res.status(201).json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("Invalid user data");
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json("All fields is required");
  }

  //   check username
  const oldUser = await User.findOne({ username });

  if (!oldUser) {
    res.status(400).json("Username is incorrect");
  } else {
    const isPwCorrect = await bcrypt.compare(password, oldUser.password);
    if (isPwCorrect) {
      res.status(200).json({
        user: oldUser,
        token: generateToken(oldUser._id),
      });
    } else {
      res.status(400).json("Password is incorrect");
    }
  }
});

module.exports = {
  register,
  login,
};
