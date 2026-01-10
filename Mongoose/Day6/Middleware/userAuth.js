const  jwt = require('jsonwebtoken');
const User = require('./user');
const userAuth = async(req,res, next)=>{
    try{

        const {token} = req.cookies;
        if(!token){
        throw new Error("Token Doesn't exist");
        }
        const payload = jwt.verify(token, "secretkey");
        //console.log(payload);
        const {_id} = payload;

        if(!_id){
        throw new Error("Id is missing in payload");
        }

        const result = await User.findById(_id);
        res.send(result);

        if(!result){
        throw new Error("User not found");
        }
        req.result = result;
        console.log("User Authentication Sucessfully");

        next();
    }
    catch(err){
        res.send("Error:" + err.message);
    }
}

module.exports = userAuth;