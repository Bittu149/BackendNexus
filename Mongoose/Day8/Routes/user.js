const express = require("express");
const userRouter = express.Router();
const userAuth = require("../Middleware/userAuth");
const User = require("../user");



userRouter.get("/info", userAuth, async (req, res) => {
  try {
     const payload = jwt.verify(req.cookies.Token, "secretkey");
     console.log(payload);
     res.send(await User.find());
    } 
     catch (err) {
    res.status(401).send(err.message);
  }
});

userRouter.get("/user", userAuth,async(req,res)=>{

  try{

    res.send(req.result);
  }
  catch(err){
    res.send("Error:" + err.message);
  }
})




// DELETE
userRouter.delete("/info", userAuth,async (req, res) => {
  await User.deleteOne({ firstName: "Aditya" });
  res.send("Data has been deleted successfully");
});

// UPDATE
userRouter.put("/info", userAuth, async (req, res) => {
  await User.updateOne(
    { firstName: "Aditya" },
    { age: 20 }
  );
  res.send("Data has been updated successfully");
});


module.exports = userRouter;