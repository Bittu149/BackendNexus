const express = require("express");
const app = express();
const main = require("./Database");
const User = require("./user")

app.use(express.json());

app.get("/info",async(req,res)=>{
   const ans =  await User.find({});
   res.send(ans);

})

app.post("/info",async(req,res)=>{

    try{
    const ans = new User(req.body);
    await ans.save();
    }
    catch(err){
        res.status(500).send(err);
    }

    res.send("Data has been added seccessfully");
})

app.delete("/info",async(req,res)=>{
    await User.deleteOne({name:"Aditya"});
    res.send("Data has been deleted sucessfully");
})

app.put("/info",async(req,res)=>{
    const result = await User.updateOne({name:"Aditya"},{age:20,city:"Afrad"});
    res.send("Data has been updated sucessfully");
})


main()
.then(async () =>{
    console.log("Connected to DB (LOCAL)")
    app.listen(3000,()=>{
    console.log("Server is running on port no 3000");
    })

    const result = await User.find({name:"Bittu"});
    console.log(result);

})
 .catch((err) => console.log(err));