import type{ Request,Response } from "express";
import { send_success } from "../utils/api_response.js";
import { exchangesetup } from "../services/google.service.js";

export async function google_callback(req:Request,res:Response){
    const code=req.query.code as string| undefined;

    const data =await exchangesetup(String(code));
    send_success(res,data);

}