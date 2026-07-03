import type{ Request, Response } from "express";
import { find_by_id,getAllUsers } from "../services/users.service.js";
import { update_user,remove_user,add_user } from "../services/users.service.js";
import { send_success } from "../utils/api_response.js";
export async function findall_users(req:Request,res:Response){
    const users=await getAllUsers();
    res.json(users);
}
export async function find_user(req:Request,res:Response){
    const {id}=req.params;
    const user=await find_by_id(Number(id));
    send_success(res,user)
}
export async function register_user(req:Request,res:Response) {
    const user= await add_user(req.body);
    send_success(res,user,"User created successfully",201)
}
export async function removeUser(req:Request,res:Response){
    const {id}=req.params;
    const user=await remove_user(Number(id));
    send_success(res,user,"User deleted successfully")
}
export async function modify_user(req:Request,res:Response){
    const {id}=req.params;
    const user=await update_user(Number(id),req.body);
    send_success(res,user)
}
