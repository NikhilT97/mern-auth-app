//server.js

const express = require("express");
const connectDB = require("./config/config");
const userRouter = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware");
const app = express();
const cors = require("cors");

require("dotenv").config();
PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://my-auth-app-delta-lac.vercel.app",
    credentials: true,
  }),
);

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
