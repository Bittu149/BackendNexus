const bcrypt = require("bcrypt");
//npm bcrypt
const password = "Bittu@12345";

// Hashcode + Salt

async function Hashing(){
console.time("hash");
const hashpass =  await bcrypt.hash(password,10);
console.timeEnd("hash");
console.log(hashpass);
}

Hashing();