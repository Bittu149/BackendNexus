
function validateUser(data){
    const mandatoryFields = ["firstName", "emailId", "age", "password"];
    const isAllowed = mandatoryFields.every((k)=> Object.keys(data).includes(k));

    if (!isAllowed) {
      return res.status(400).send("Fields missing");
    }
}

module.exports = validateUser;
