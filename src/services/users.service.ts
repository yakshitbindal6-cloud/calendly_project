import type { CreateUserDto, RemoveUserDto, UpdateUserDto } from '../dtos/user_dto.js';
import type { availability_dto } from '../dtos/availability_dto.js';
import {availability_pref, getall} from '../repositories/user.repository.js';
import { getbyid,getbyemail,store_availability } from '../repositories/user.repository.js';
import { update,delete_user,create_user } from '../repositories/user.repository.js';
import { badRequest, notFound } from '../utils/api_error.js';
export async function getAllUsers(){
    const users=await getall();
    return users;
}
export async function find_by_id(id:number){
    const user=await getbyid(id)
    if(!user){
        throw notFound("user not fount");
    }
    return user;
}
export async function add_user(data:CreateUserDto){
    const exit_user=await getbyemail(data.email)
    if(exit_user){
        throw badRequest("User already exists");
    }
    return create_user(data);
}
export async function remove_user(id:RemoveUserDto['id']){
    const user=await getbyid(id)
    if(!user){
        throw badRequest("user not found");
    }
    return  delete_user(id)
}
export async function update_user(id:number,data:UpdateUserDto){
   const exit_user=await getbyid(id)
    if(!exit_user){
        throw notFound("user not fount");
    }
    if(data.email && data.email!==exit_user.email){
        const user=await getbyemail(data.email)
        if(user){
            throw badRequest("User already exists");
        }
    }
    return update(id, data);
}
export async function user_availability(id:number){
    const user =await find_by_id(id)
     if(!user) throw notFound("user not found")
    return availability_pref(id)
}
export async function create_availability(data: availability_dto) {
    const user = await find_by_id(data.user_id);

    if (!user) {
        throw notFound("user not found");
    }

    return store_availability(data);
}
