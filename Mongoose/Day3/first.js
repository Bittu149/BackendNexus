const bcrypt = require("bcrypt");
//npm bcrypt
const password = "Bittu@12345";

// Hashcode + Salt

async function Hashing(){
//console.time("hash");
const salt = await bcrypt.genSalt(10);
const hashpass =  await bcrypt.hash(password,salt);

const ans = await bcrypt.compare(password,hashpass);
console.log(ans);

console.log(salt);
//console.timeEnd("hash");
console.log(hashpass);
}

Hashing();

//Basically salt same hota hai hash se but salt hash half hota same 
// See
//$2b$10$IGc7FoFgeCSsEMUXKwxiMu
//$2b$10$IGc7FoFgeCSsEMUXKwxiMus0P1YL8aj4wgC43t27fqixTlkx3y05q
// bcrypt me $2b version hai , round hai ye $10 hai in dono ke baad jo hai salt hai 
// salt -> $IGc7FoFgeCSsEMUXKwxiMu -> 22 character ka hota hai 
// hash code -> s0P1YL8aj4wgC43t27fqixTlkx3y05q -> 31 character ka hota hai 