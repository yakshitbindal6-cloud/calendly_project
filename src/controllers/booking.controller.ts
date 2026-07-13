import type{ Request,Response } from "express";
import { send_success } from "../utils/api_response.js";
import { create_booking_optimistic } from "../services/booking.service.js";

export async function create_booking(req:Request,res:Response){
    const user_id=req.user_id
    const data= await create_booking_optimistic(user_id,req.body)
    send_success(res,data,"booking created successfully");
}