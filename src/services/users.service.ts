import type { CreateUserDto, RemoveUserDto, UpdateUserDto } from '../dtos/user_dto.js';
import { getall } from '../repositories/user.repository.js';
import { getbyid,getbyemail } from '../repositories/user.repository.js';
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
