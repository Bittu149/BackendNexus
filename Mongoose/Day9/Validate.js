//Digital Signature ko use karte hai password ko or har imp chiz ko encrypt  karne ke liye with the help of public and private key
// Hashing q karte hai integrity ko maintain karne ke liye
//Go to the google and search npm validator package for validation of email and password 
const validator = require("validator");
function validateUser(data){
    const mandatoryFields = ["firstName", "emailId", "age", "password"];
    const isAllowed = mandatoryFields.every((k)=> Object.keys(data).includes(k));

          if (!isAllowed)
               throw new Error("Fields missing");

    if(!validator.isEmail(data.emailId))
         throw new Error("invalid email id");

    if(!validator.isStrongPassword(data.password))
         throw new Error("Password is not strong");
    
    if(data.firstName.length<3 ||data.firstName.length>20)
            throw new Error("First name must be between 3 to 20 characters");

}

module.exports = validateUser;
