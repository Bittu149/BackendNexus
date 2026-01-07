
//Go to the google and search npm validator package for validation of email and password 
const validator = require("validator");
function validateUser(data){
    const mandatoryFields = ["firstName", "emailId", "age", "password"];
    const isAllowed = mandatoryFields.every((k)=> Object.keys(data).includes(k));

    if (!isAllowed) 
      return res.status(400).send("Fields missing");

    if(!validator.isEmail(data.emailId))
         throw new Error("invalid email id");

    if(!validator.isStrongPassword(data.password))
         throw new Error("Password is not strong");
    
    if(data.firstName.length<3 ||data.firstName.length>20)
            throw new Error("First name must be between 3 to 20 characters");

}

module.exports = validateUser;
