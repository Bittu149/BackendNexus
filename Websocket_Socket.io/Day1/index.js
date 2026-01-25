const express = require('express');
const app = express();
const {Server} = require("socket.io");

app.listen(3000,()=>{
    console.log("Server is listen at post no 3000");
})