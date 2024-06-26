const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

const authMiddleware = asynchandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //getuser
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized token");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
});

module.exports = { authMiddleware };
