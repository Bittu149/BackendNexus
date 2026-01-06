const bcrypt = require("bcrypt");

const password = "Bittu@12345";

// Hashcode + Salt

async function Hashing(){
const hashpass =  await bcrypt.hash(password,10);
console.log(hashpass);
}

Hashing();