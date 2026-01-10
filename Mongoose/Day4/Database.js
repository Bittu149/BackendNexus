const mongoose = require('mongoose');

async function main() {
  // 🔗 DB connect
  await mongoose.connect("mongodb://localhost:27017/Instagram");

  // Schema (CORRECT)
//   const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     city: String,
//     gender: String
//   });

  //  Model (singular name)
  //const User = mongoose.model("User", userSchema);

  //  Create & save ONE document
//   const user1 = new User({
//     name: "Bittu",
//     age: 21,
//     city: "Siwan",
//     gender: "Male"
//   });
//   await user1.save();

  //Insert MANY documents
//   await User.insertMany([
//     { name: "Ankit", age: 22, city: "Pune", gender: "Male" }
//   ]);

//   const answer = await User.find({}); // find all users
//   console.log(answer);

//   console.log("Data inserted successfully");
}

module.exports = main;
