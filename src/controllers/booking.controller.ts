import type{ Request,Response } from "express";
import { send_success } from "../utils/api_response.js";
import { create_booking_optimistic, create_booking_pessimistic, list_host_bookings ,Cancel_booking} from "../services/booking.service.js";
import type { listHostBookingQuery } from "../dtos/booking_dto.js";

export async function create_booking(req:Request,res:Response){
    const user_id=req.user_id
    const data= await create_booking_pessimistic(user_id,req.body)
    send_success(res,data,"booking created successfully");
}

export async function list_host_bookings_controller(req:Request,res:Response){
    const host_id=req.user_id
    const query = req.query as unknown as listHostBookingQuery
    const bookings = await list_host_bookings(host_id, query)
    send_success(res,bookings,"bookings retrieved successfully");
}
export async function cancel_booking_controller(req:Request,res:Response){
    const  {booking_id} = req.params
    const host_id=req.user_id
    const booking = await Cancel_booking(host_id,Number(booking_id))
    send_success(res,booking,"booking cancelled successfully");
}