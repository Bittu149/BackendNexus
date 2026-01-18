const jwt = require('jsonwebtoken');
const User = require('../user');
const { redisClient } = require('../config/redis');

const userAuth = async(req, res, next) => {
    try {
        const token = req.cookies.Token;
        if (!token) {
            throw new Error("Token Doesn't exist");
        }
        
        const secret = process.env.SECRET_KEY || "secretkey";
        const payload = jwt.verify(token, secret);
        const { _id } = payload;

        if (!_id) {
            throw new Error("Id is missing in payload");
        }

        const result = await User.findById(_id);
        if (!result) {
            throw new Error("User not found");
        }

        const IsBlocked = await redisClient.exists(`token:${token}`);
        if (IsBlocked) {
            throw new Error("Invalid token - token is blacklisted");
        }

        req.result = result;
        console.log("User Authentication Successfully");
        next();
    } catch (err) {
        res.status(401).json({ error: "Error: " + err.message });
    }
};

module.exports = userAuth;