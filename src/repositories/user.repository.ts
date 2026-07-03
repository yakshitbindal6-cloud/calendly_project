import { prisma } from "../config/database.js";
import type { CreateUserDto,RemoveUserDto, UpdateUserDto } from "../dtos/user_dto.js";
import { notFound } from "../utils/api_error.js";

export async function getall(){
    const user=await prisma.user.findMany();
    return user;
}
export async function getbyid(id:number){
    const user=await prisma.user.findUnique({
        where:{
            user_id: id
        }
    });
    if (!user) throw notFound("User not found");
    return user;
}
export async function getbyemail(email:string){
    const user=await prisma.user.findUnique({
        where:{
            email
        }
    });
    return user;
}
export async function create_user(data: CreateUserDto & {slug:string}) {
    return prisma.user.create({
        data: {
            ...data,
        },
    });
}
export async function delete_user(id:RemoveUserDto['id']){
     return prisma.user.delete({
        where:{
            user_id: id
        }
    })
}
export async function update(id:number, data:UpdateUserDto){
    const user=await prisma.user.update({
    where:{
        user_id: id
    },
    data
})
    return user;
}
