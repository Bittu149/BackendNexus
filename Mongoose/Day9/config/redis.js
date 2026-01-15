const redis = require('redis');

const redisClient = redis.createClient({
    username: 'default',
    password: '4SZdo1dqTEFcpJWze39mJiXPAbdZb5sV',
    socket: {
        host: 'redis-14829.crce182.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 14829
    }
});

redisClient.on('error', (err) => {
    console.error("Redis Client Error:", err);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis");
    } catch (err) {
        console.error("Failed to connect to Redis:", err.message);
        throw err;
    }
};

module.exports = { redisClient, connectRedis };