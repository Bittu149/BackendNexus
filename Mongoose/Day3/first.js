const bcrypt = require("bcrypt");
//npm bcrypt
const password = "Bittu@12345";

// Hashcode + Salt

async function Hashing(){
//console.time("hash");
const salt = await bcrypt.genSalt(10);
const hashpass =  await bcrypt.hash(password,salt);
console.log(salt);
//console.timeEnd("hash");
console.log(hashpass);
}

Hashing();