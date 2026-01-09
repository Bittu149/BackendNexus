const express = require("express");
const app = express();
const main = require("./Database");
const User = require("./user");
const validateUser = require("./Validate");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const  jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser());
// npm cookie parser
// npm install 
// npm jwttoken

// GET all users
app.get("/info", async (req, res) => {
  try {
     const payload = jwt.verify(req.cookies.Token, "secretkey");
     console.log(payload);
     res.send(await User.find());
    } 
     catch (err) {
    res.status(401).send(err.message);
  }
});

app.get("/user",async(req,res)=>{

  try{
    const payload = jwt.verify(req.cookies.Token, "secretkey");
    //console.log(payload);
    const result = await User.findById(payload._id);
    res.send(result);
  }
  catch(err){
    res.send("Error:" + err.message);
  }
})


// REGISTER
app.post("/register", async (req, res) => {
  try {
     
    validateUser(req.body);

    // Converting  plain password to hashed password
    req.body.password = await bcrypt.hash(req.body.password,10);


    const user = await User.create(req.body);
    console.log("CREATED:", user);

    return res.send("User Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // basic validation
    if (!emailId || !password) {
      return res.status(400).send("EmailId and password required");
    }
    
    const people = await User.findOne({ emailId });

    if (!people) {
      throw new Error("Invalid credentials");
    }

    
    const isAllowed = await bcrypt.compare(password, people.password);

    if (!isAllowed) {
      throw new Error("Invalid credentials");
    }
    // JWT token
    const token = jwt.sign({_id:people._id,emailId:people.emailId}, "secretkey");
    res.cookie("Token",token);
    res.send("Login Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

// DELETE
app.delete("/info", async (req, res) => {
  await User.deleteOne({ firstName: "Aditya" });
  res.send("Data has been deleted successfully");
});

// UPDATE
app.put("/info", async (req, res) => {
  await User.updateOne(
    { firstName: "Aditya" },
    { age: 20 }
  );
  res.send("Data has been updated successfully");
});

main()
  .then(async () => {
    console.log("Connected to DB (LOCAL)");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    // CORRECT FIND
    const result = await User.find({ firstName: "Bittu" });
    console.log("FOUND:", result);
  })
  .catch(err => console.log(err));
