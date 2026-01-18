
const { redisClient } = require('../config/redis');

const windowSize = 3600;  // Total time
const maxREquest = 60;  // max request in window size

const rateLimiter = async (req, res, next) => {

    try{
        const key = `IP:${req.ip}`;

        const currentTime = Date.now()/1000; // in seconds 
        const window_Time = currentTime - windowSize;

        await redisClient.zRemRangeByScore(key, 0, window_Time);

        const numberofRequest = await redisClient.zCard(key);

        if(numberofRequest >= maxREquest){
            throw new Error("Number of requests exceeded");
        }
        await redisClient.zAdd(key, [{score: currentTime, value: `${currentTime}:${Math.random()}`}]);
        // request is added

        // key  TTL usko increse karna ha 
        await redisClient.expire(key, windowSize);
        next();



    } 
    catch(err){
        res.send("Error:" +err.message);

    }

}

module.exports = rateLimiter;

// sliding window algorithm
// using sorted sets in redis
// set_implement == value unique
// key == multiple value 
// score : number
// score can be duplicate
// key = user ip
// score = current time(UNIX SECONDS)
// value = 
// math.random = initial_seed = system clock 
// crypto.random = initial_seed = hardware entropy source