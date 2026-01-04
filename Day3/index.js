const http = require('http');

const server = http.createServer((req,res)=>{
    //res.end("Hello from Backend Nexus");
    if(req.url==="/"){
        res.end("Hello from Backend Nexus");
    }
    else if(req.url==="/contact"){
        res.end("This our contact page of Backend Nexus");
    }
    else if(req.url==="/about"){
        res.end("This is our about page of Backend Nexus");
    }
    else{
        res.end("Error 404 page not found");
    }

});

server.listen(4000,()=>{
    console.log("Server is running on port number 4000");
})