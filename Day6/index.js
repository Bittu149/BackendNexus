const express = require("express");
const app = express();

//CRUD - Create, Read, Update, Delete

//Database: Array

app.use(express.json());

const FoodMenu = [
    {id: 1, name: "Chowemin", category: "Veg", Price: 100},
    {id: 2, name: "Pizza", category: "Veg", Price: 300},
    {id: 3, name: "Momos", category: "Non-veg", Price: 50},
    {id: 4, name: "Biryani", category: "Non-veg", Price: 120},
    {id: 5, name: "Roll", category: "Veg", Price: 70},
    {id: 6, name: "Thali", category: "Veg", Price: 130},
    {id: 7, name: "Butter Naan", category: "Veg", Price: 30},
    {id: 8, name: "Chicken", category: "Non-veg", Price: 170},
    {id: 9, name: "Mutton", category: "Non-veg", Price: 400},
    {id: 10, name: "Chai", category: "Veg", Price: 20},
    {id: 11, name: "Rajma", category: "Veg", Price: 110},
    {id: 12, name: "Chicken Lolipop", category: "Non-veg", Price: 200},
    {id: 13, name: "Egg Curry", category: "Non-veg", Price: 140},
    {id: 14, name: "Mushroom", category: "Veg", Price: 240},

]

const AddToCart = [];


app.get("/food",(req,res)=>{
    res.status(200).send(FoodMenu);
})

//Authentication admin here
app.use("/admin",(req,res,next)=>{

    // Add item into food menu
    // Authentication karna padega ki kya ye admin hi hai
    // Dummy code 
    const token = "ABCDF";
    const Access = token ==="ABCDF" ?1:0;

    if(!Access)
        res.status(403).send("No Permission to Access Admin Routes");

    next();

})

app.post("/admin",(req,res)=>{

        FoodMenu.push(req.body);
        res.status(201).send("Item added Secussfully");

    
})

app.delete("/admin/:id",(req,res)=>{

    const id = parseInt(req.params.id);

    const index = FoodMenu.findIndex(item => item.id === id);

        if(index===-1){
           res.send("Item Doesn't Exists");
        }
        else{
            FoodMenu.splice(index,1);
            res.send("Deleted Item From Menu");
        }

    
    

    
})


app.post("/user/:id",(req,res)=>{

    const id = parseInt(req.params.id);
    const foodItem = FoodMenu.find(item=> item.id===id);

    if(foodItem){
        AddToCart.push(foodItem);
        res.status(201).send("Item Added To Cart Sucessfully");
    }
    else{
        res.send("Item Not Found");
    }

})


app.delete("/user/:id",(req,res)=>{

   const id =  parseInt(req.params.id);

   const index = AddToCart.findIndex(item => item.id ===id);


   if(index!=-1){
    AddToCart.splice(index,1);
    res.send("Item Removed From Cart Sucessfully");
   }
   else{
    res.send("Item Not Found in Cart");
   }
})


app.get("/user",(req,res)=>{
    try{
    if(AddToCart.length===0)
        res.send("Cart is Empty");
    else
        res.send(AddToCart);
    }
    catch(err){
        res.send("Some error Occured" + err);
    }   

})


app.get("/dummy",(req,res)=>{
    try{
        JSON.parse({"Name":"Bittu Kumar singh"});
        res.send("This is Dummy Route");
    }
    catch(err){
        res.send("Some Error Occured");
    }
})






app.listen(5000,()=>{
    console.log("Server is running on port number 5000")
})




































































