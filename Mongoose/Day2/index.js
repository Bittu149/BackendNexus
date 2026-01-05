const express = require("express");
const app = express();
const main = require("./Database");
const User = require("./user")

app.use(express.json());



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