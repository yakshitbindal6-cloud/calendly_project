import {redisClient} from "../config/redis.js";

const Google_Refresh_Token_key = 'google:refresh_token';
export async function setGoogleRefreshToken(token: string) {
    await redisClient.set(Google_Refresh_Token_key, token);
}
export async function getGoogleRefreshToken() {
    return await redisClient.get(Google_Refresh_Token_key);
}