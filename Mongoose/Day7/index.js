const express = require("express");
const app = express();
const main = require("./Database");
const User = require("./user");
const validateUser = require("./Validate");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const  jwt = require('jsonwebtoken');
const userAuth = require("./Middleware/userAuth");
const env = require('dotenv').config({ path: __dirname + '/../.env' });
const authRouter = require("./Routes/Auth");
const userRouter = require("./Routes/user");



app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", userRouter);
// npm cookie parser
// npm install 
// npm jwttoken

// GET all users
main()
  .then(async () => {
    console.log("Connected to DB (LOCAL)");
    const port = process.env.PORT_NO || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // CORRECT FIND
    const result = await User.find({ firstName: "Bittu" });
    console.log("FOUND:", result);
  })
  .catch(err => console.log(err));
