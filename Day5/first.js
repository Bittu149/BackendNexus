const express = require("express");
const app = express();


// app.use(route, (Route Handler...))

app.use("/user",(req,res,next)=>{
    console.log("First ");
    //res.send("User Page");
    next();
},
(req,res,next)=>{
    console.log("Second");
    next();
    //res.send("Second Handler");
},

(req,res,next)=>{
    console.log("Third");
    next();
    //res.send("Second Handler");
},

(req,res)=>{
    console.log("fourth");
    res.send("Request Handler");
});











app.listen(4000,()=>{
    console.log("Server is running on port number 4000");
})
