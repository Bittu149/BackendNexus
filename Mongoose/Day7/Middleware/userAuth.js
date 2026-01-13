const  jwt = require('jsonwebtoken');
const User = require('../user');
const userAuth = async(req,res, next)=>{
    try {
        const token = req.cookies.Token;
        if (!token) {
            throw new Error("Token Doesn't exist");
        }
        const payload = jwt.verify(token, "secretkey");
        const { _id } = payload;

        if (!_id) {
            throw new Error("Id is missing in payload");
        }

        const result = await User.findById(_id);

        if (!result) {
            throw new Error("User not found");
        }

        req.result = result;
        console.log("User Authentication Successfully");

        next();
    } catch (err) {
        res.status(401).send("Error:" + err.message);
    }
}

module.exports = userAuth;