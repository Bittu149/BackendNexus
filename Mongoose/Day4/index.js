const express = require("express");
const app = express();
const main = require("./Database");
const User = require("./user");
const validateUser = require("./Validate");
const bcrypt = require("bcrypt");

app.use(express.json());

// GET all users
app.get("/info", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// REGISTER
app.post("/register", async (req, res) => {
  try {
     
    validateUser(req.body);

    // Converting  plain password to hashed password
    req.body.password = await bcrypt.hash(req.body.password,10);


    const user = await User.create(req.body);
    console.log("CREATED:", user);

    return res.send("User Registered Successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// DELETE
app.delete("/info", async (req, res) => {
  await User.deleteOne({ firstName: "Aditya" });
  res.send("Data has been deleted successfully");
});

// UPDATE
app.put("/info", async (req, res) => {
  await User.updateOne(
    { firstName: "Aditya" },
    { age: 20 }
  );
  res.send("Data has been updated successfully");
});

main()
  .then(async () => {
    console.log("Connected to DB (LOCAL)");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    // CORRECT FIND
    const result = await User.find({ firstName: "Bittu" });
    console.log("FOUND:", result);
  })
  .catch(err => console.log(err));
