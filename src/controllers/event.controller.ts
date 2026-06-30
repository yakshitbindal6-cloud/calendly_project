import type{ Request, Response } from "express";
import { send_success } from "../utils/api_response.js";
import { get_user_events,get_event_by_slug, make_event } from "../services/event.service.js";
export async function add_event(req:Request,res:Response){
    const {id}=req.params
    const data=await make_event(Number(id),req.body)
    send_success(res,data,"event succesfully created");
}
export async function getEvent_byuser(req:Request,res:Response){
    const {id}=req.params;
    const data=await get_user_events(Number(id));
    send_success(res,data);
}
export async function getEvent_by_slug(req:Request,res:Response){
    const { slug } = req.params;
    const event = await get_event_by_slug(String(slug));
    send_success(res, event);
}