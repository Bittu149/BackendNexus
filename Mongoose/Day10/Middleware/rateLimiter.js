
const { redisClient } = require('../config/redis');

const rateLimiter = async (req, res, next) => {

    try{
        const ip = req.ip;

        const count = await redisClient.incr(ip);

        if(count > 60){
            throw new Error("User limit excedded");
        }

        if(count ==1){
           await redisClient.expire(3600); // 1 hour
        }
        next();

    }
    catch(err){
        res.send("Error:" +err.message);

    }

}

module.exports = rateLimiter;