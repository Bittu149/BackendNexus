const mongoose = require('mongoose');

async function main() {
  // 🔗 DB connect
  await mongoose.connect(process.env.DB_CONNECT_KEY);

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

// JWT.io website -> to encode and decode JWT tokens
// JWT token stateless hota hai
// JWT Stand for JSON WEB TOKEN 
// it is used for authentication and inforamtion exchange between two parties
// ye string hota hai jo 3 parts me divided hota hai header.payload.digitalSignature
// header -> algorithm and token type
// payload -> contains actual data
// digital Signature -> to verify the token is not tampered with
// Hashcode -> it is used to convert data into fixed length string of characters 
// hashcode one way hota hai jise reverse nhi kiya ja sakta
// encription -> two way hoata hai jise reverse kiya ja sakta hai using public and private or secrete or server key 
// refresh jwt token -> it is used to generate new access token once access token is expired without login again
// Refresh token koi information nhi rakhta sirf access token generate karne ke kaam aata hai 
// Refresh token koi random string hota hai jise server side store kiya jata hai 
// Refresh token hashcode me store kiya jata hai taaki agar koi refresh token leak ho jaye to usse koi fyda na ho 