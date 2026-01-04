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

app.patch("/book",(req,res)=>{
    console.log(req.body);
    const Book = BookStore.find(info=>info.id===req.body.id);


    if(req.body.author)
        Book.author=req.body.author;


    if(req.body.name)
        Book.name=req.body.name;

        res.send("Patch Updated");
})


app.put("/book",(req,res)=>{
    const Book = BookStore.find(info => info.id === req.body.id);

    Book.author = req.body.author;
    Book.name = req.body.name;

    res.send("Changes  Updated Secussfully ");
})

app.delete("/book/:id",(req,res)=>{

   const id =  req.params.id;

   const index = BookStore.findIndex(info => info.id === id);
   BookStore.splice(index,1);

   res.send("Data Deleted Sucessfully");

});

















app.listen(5000,()=>{
    console.log("Server is running on port number 5000")
})




































































