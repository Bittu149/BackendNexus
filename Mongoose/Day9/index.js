const express = require("express");
const app = express();
const main = require("./Database");
const User = require("./user");
const validateUser = require("./Validate");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userAuth = require("./Middleware/userAuth");
const env = require('dotenv').config({ path: __dirname + '/../.env' });
const authRouter = require("./Routes/Auth");
const userRouter = require("./Routes/user");
const { redisClient, connectRedis } = require("./config/redis");

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/", userRouter);

// Initialize connection
const InitializeConnection = async () => {
  try {
    await Promise.all([connectRedis(), main()]);
    console.log("Connected to DB and Redis");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Listen at port ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.log("Error: " + err.message);
   // process.exit(1);
  }
};

InitializeConnection();