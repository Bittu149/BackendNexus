const jwt = require('jsonwebtoken');
const User = require('../user');
const { redisClient } = require('../config/redis');

const rateLimiter = async (req, res, next){

    try{
        const ip = req.ip;

    }
    catch(err){
        res.send("Error:" +err.message);

    }

}

module.exports = rateLimiter;