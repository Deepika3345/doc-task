const asyncHandler = require("express-async-handler");
const User = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if (!name || !lastname || !email || !password) {
    res.status(400);
    throw new Error("please fill all details");
  }
  // Check if User Exists
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(401);
    throw new Error("User already exists");
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    lastname,
    email,
    // isAdmin: isAdmin || false,
    password: hashedpassword,
  });
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    //   isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
});
// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Fill all details");
  }
  // check userexist
  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid");
  }
});
const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { registerUser, loginUser };
