import type{ Request, Response } from "express";
import { send_success } from "../utils/api_response.js";
import { get_user_events, create_event, remove_event, update_event, getevent_public, get_event_byID } from "../services/event.service.js";
export async function add_event(req:Request,res:Response){
    const user_id = req.user_id;
    const data = await create_event(user_id, req.body)
    send_success(res,data,"event succesfully created");
}
export async function list_user_events(req:Request,res:Response){
    const user_id = req.user_id;
    const data = await get_user_events(user_id);
    send_success(res,data);
}

export async function delete_event(req:Request,res:Response){
    const user_id = req.user_id;
    const { event_id } = req.params;
    const data = await remove_event(user_id, Number(event_id));
    send_success(res, data, "event successfully deleted");
}

export async function patch_event(req:Request,res:Response){
    const user_id = req.user_id;
    const { event_id } = req.params;
    const data = await update_event(user_id, Number(event_id), req.body);
    send_success(res, data, "event successfully updated");
}

export async function get_public_event(req:Request,res:Response){
    const { user_id, slug } = req.params;
    const data = await getevent_public(Number(user_id), String(slug));
    send_success(res, data);
}

export async function get_event_byID_controller(req:Request,res:Response){
    const { event_id } = req.params;
    const data = await get_event_byID(Number(event_id));
    send_success(res, data);
}