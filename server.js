//server.js

const express = require("express");
const connectDB = require("./config/config");
const userRouter = require("./routes/auth.routes");
const app = express();
require("dotenv").config();
PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/users", userRouter);

app.listen(PORT, () => {
  try {
    console.log(` server started `);
    connectDB();
  } catch (error) {
    console.log("server connection failed");
  }
});
