const express = require("express");


// instant of app ya create server
const app = express();

// Book store Project
const BookStore = [
    {id:1, name:"Harry Potter", author:"DevFlux"},
    {id:2, name:"Rich Dad Poor Dad", author:"Robert Kiyosaki"},
    {id:3, name:"Atomic Habits", author:"James Clear"}
]

// parser
app.use(express.json());

app.get("/book",(req,res)=>{
    res.send(BookStore);
})

app.get("/book/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const Book = BookStore.find(info=>info.id===id);
    res.send(Book);

})

app.post("/book",(req,res)=>{
    console.log(req.body);
    BookStore.push(req.body);
    res.send("Data Saved Secuessfully");

})


















app.listen(5000,()=>{
    console.log("Server is running on port number 5000")
})




































































// ? char become Optional
// + char can be repeated multiple times 
// * any number of characeter can arrive 
// abou+t
// abou*t
// abou?t
// : isko lga ke app dynamic bna skte hai 

// app.use("/about/:id", (req, res)=>{
//     console.log(req.params);
//     res.send("Hello maine routing kiya hai about page ko");

// })

// app.use("/about", (req, res)=>{
//     res.send("Hello maine routing kiya hai about page ko");

// })

// app.use("/Contact", (req, res)=>{
//     res.send("Hello maine routing kiya hai contact page ko");

// })

// app.use((req, res)=>{
//     res.send("Hello From Backend Nexus Using Express Framework...");

// })



// Parsing the data coming from client to server
//app.use(express.json());

// middleware: json format data=> JS Object me convert kr deta hai ye


// app.get("/user",(req,res)=>{
//     res.send({name:"Bittu", city:"Siwan"});
// })

// app.post("/user", (req,res)=>{
//     //console.log("Data saved Sucessfully");
//     console.log(req.body);
//     res.send("Data saved Sucessfully");
// })


