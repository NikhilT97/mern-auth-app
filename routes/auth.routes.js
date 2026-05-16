//auth.routes.js

const express = require("express");
const userModel = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
        res.status(200).json({ message: "login successfull" });
      } else {
        res.status(500).json({ message: "wrong password, login failed" });
      }
    } catch (error) {
      res.status(500).json({ message: "login failed", error: error.message });
    }
  }
});

module.exports = userRouter;
