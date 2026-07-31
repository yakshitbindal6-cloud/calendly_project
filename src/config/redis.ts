import {Redis}  from 'ioredis'
import  {Redis_Host, Redis_Port } from "./env.js";
export const redisClient = new Redis({
    host: Redis_Host,
    port: Redis_Port,
});
redisClient.on('connect', () => {
    console.log('Redis client connected');
});
redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});