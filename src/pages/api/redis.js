import Redis from "ioredis";

// Connect to Redis
//need to update this key
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

export default redis;
