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



app.use(express.json());
app.use(cookieParser());
// npm cookie parser
// npm install 
// npm jwttoken

// GET all users
app.get("/info", userAuth, async (req, res) => {
  try {
     const payload = jwt.verify(req.cookies.Token, "secretkey");
     console.log(payload);
     res.send(await User.find());
    } 
     catch (err) {
    res.status(401).send(err.message);
  }
});

app.get("/user", userAuth,async(req,res)=>{

  try{

    res.send(req.result);
  }
  catch(err){
    res.send("Error:" + err.message);
  }
})




// DELETE
app.delete("/info", userAuth,async (req, res) => {
  await User.deleteOne({ firstName: "Aditya" });
  res.send("Data has been deleted successfully");
});

// UPDATE
app.put("/info", userAuth, async (req, res) => {
  await User.updateOne(
    { firstName: "Aditya" },
    { age: 20 }
  );
  res.send("Data has been updated successfully");
});

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
