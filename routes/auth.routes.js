//auth.routes.js

const express = require("express");
const userModel = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.middleware");

userRouter.post("/signup", async (req, res) => {
  try {
    // const email = req.body.email
    const user = await userModel.findOne({ email: req.body.email });

    const myPlaintextPassword = req.body.password;

    if (user) {
      return res.status(200).json({ message: "email already registered" });
    }

    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

    await userModel.create({ ...req.body, password: hash });
    res.status(201).json({ message: "signup successfull" });
  } catch (error) {
    res.status(500).json({ message: "signup failed", error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  const myPlaintextPassword = req.body.password;
  if (!user) {
    res.status(500).json({ message: "no user found" });
  } else {
    try {
      const hash = user.password;
      const result = await bcrypt.compare(myPlaintextPassword, hash);
      console.log(result);

      if (result) {
        var token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.SECRET_KEY,
          { expiresIn: process.env.EXPIRES_IN },
        );
        res.status(200).json({ message: "login successfull", token: token });
      } else {
        res.status(500).json({ message: "wrong password, login failed" });
      }
    } catch (error) {
      res.status(500).json({ message: "login failed", error: error.message });
    }
  }
});

//protected - profile route;
userRouter.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "failed to fetch profile" });
  }
});

module.exports = userRouter;
