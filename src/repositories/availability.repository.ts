import { prisma } from "../config/database.js";
import type { CreateAvailabilityDto, UpdateAvailabilityDto } from "../dtos/availability_dto.js";
export async function create(user_id: number, data: CreateAvailabilityDto ) {
    const availability =await prisma.availability_pref.create({
        data: {
            user_id,
            ...data
        }
    })
    return availability;
}   
export async function update(pref_id: number, data: UpdateAvailabilityDto) {
    const availability = await prisma.availability_pref.update({
        where: {
            pref_id
        },
        data
    })
    return availability;
}
export async function remove(pref_id:number){
    await prisma.availability_pref.delete({
        where:{
            pref_id,
        }
    })
}
export async function find_availability_byUser(user_id:number){
    const avail=await prisma.availability_pref.findMany({
        where:{user_id},
        orderBy: [{ weekday: "asc" }, { start_time: "asc" }],
    })
    return avail;
}
export async function find_active_availability(user_id:number){
    const avail=await prisma.availability_pref.findMany({
        where:{
            user_id,
            isActive:true,
        },
        orderBy: [{ weekday: "asc" }, { start_time: "asc" }],
    })
    return avail;
}
export async function find_availability_ById(pref_id:number){
    const avail=await prisma.availability_pref.findUnique({
        where:{
            pref_id,
        }
    })
    return avail
}
