const express = require('express');
const app = express();
const {Server} = require("socket.io");
const http = require('http');
const path = require('path')



const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req,res)=>{

    res.sendFile(path.join(__dirname,'index.html'))

});

io.on("connection",(socket)=>{

    socket.on('message',(data)=>{// io matlab mai sabko listen kar raha hu multiple
        socket.broadcast.emit('new-message',data);// emit matlab bhejna or broadcast se mujhe nhi show hoga msg but dusre ko hoga show
    })

    socket.on('join-room',(room)=>{
        socket.join(room);  // socket.join se haam room create kar skte hai 
    })

    socket.on("disconnect",()=>{
        console.log("Disconnected from server")
    })

})

server.listen(3000,()=>{
    console.log("Server is listen at port no 3000");
})





// const server = app.listen(3000,()=>{
//     console.log("Server is listen at post no 3000");
// })



// 3 way handshake protocol
// 4 way handshake tcp tier down
// long polling
// HTTP streaming -> send data in stream form or chunck form...
// Problem: Head-of-line Blocking-->
// Tcp connection upgrade hota hai Websocket me ->2 way handshake 
// aphle tcp connection banta hai then wo update hoke websocket hota hai
// websocket ke uper build hua hai socket.io
// socket.io q use kar rahe hai q ki bohut saari drawback hai websocket ke 
// chat gpt pe dekh na hai 