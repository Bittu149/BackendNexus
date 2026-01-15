const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../user");


// Create Router
const authRouter = express.Router();



authRouter.post("/register", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    
    const people = await User.findOne({emailId:req.body.emailId});
    
    const  IsAllowed = await people.verifyPassword(req.body.password);


    if (!IsAllowed) 
      throw new Error("Invalid credentials");
    
    // JWT token
    const token = people.getJWT();
    res.cookie("Token",token);
    res.send("Login Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


authRouter.post("/logout", (req,res)=>{
    
  try{
    res.cookie("Token",null,{expires:new Date(Date.now())});
    res.send("Logout Sucessfully");

  }
  catch(err){
    res.send("Error:"+err.message);
  }


})


// redis ak database hai 
// redis bohut fast hot hai 
// agr hm baar baar same data ko access karte hai toh hm redis me store kar sakte hai
// go to the redis website to know more about redis
// redis inmemory database hai  
module.exports = authRouter;