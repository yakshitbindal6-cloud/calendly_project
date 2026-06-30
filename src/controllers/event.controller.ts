import type{ Request, Response } from "express";
import { send_success } from "../utils/api_response.js";
import { get_user_events, create_event, remove_event, update_event, getevent_public } from "../services/event.service.js";
export async function add_event(req:Request,res:Response){
    const {id}=req.params
    const data=await create_event(Number(id),req.body)
    send_success(res,data,"event succesfully created");
}
export async function getEvent_byuser(req:Request,res:Response){
    const {id}=req.params;
    const data=await get_user_events(Number(id));
    send_success(res,data);
}

export async function delete_event(req:Request,res:Response){
    const { user_id, event_id } = req.params;
    const data = await remove_event(Number(user_id), Number(event_id));
    send_success(res, data, "event successfully deleted");
}

export async function patch_event(req:Request,res:Response){
    const { event_id } = req.params;
    const data = await update_event(Number(event_id), req.body);
    send_success(res, data, "event successfully updated");
}

export async function get_public_event(req:Request,res:Response){
    const { user_id, slug } = req.params;
    const data = await getevent_public(Number(user_id), String(slug));
    send_success(res, data);
}