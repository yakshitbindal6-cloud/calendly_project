import { prisma } from "../config/database.js";
export async function findBookedSlotsByHostInRange(user_id:number,start_date:Date,end_date:Date){
    return prisma.slot.findMany({
        where:{
            user_id,
            start_time:{
                gte:start_date,
                lte:end_date
            },
            status:"booked"
        },
    })
}

export async function upsertSlot(user_id:number,event_id:number,start:Date,end:Date){
    return prisma.slot.upsert({
        where:{
            event_id_start_time_end_time:{
                event_id,
                start_time:start,
                end_time:end
            }
        },
        create:{
            user_id,
            event_id,
            start_time:start,
            end_time:end,
            status:"available",
        },
        update:{
            status:"available",
        }
    })
}

export async function findSlotsByEventInRange(event_id:number,from:Date,to:Date,statuses:string[]){
    return prisma.slot.findMany({
        where:{
            event_id,
            start_time:{
                gte:from,
                lte:to
            },
            status:{in: statuses}
        }
    })
}
export async function updateSlotStatus(slot_id:string,status:string){
    return prisma.slot.update({
        where:{
            slot_id
        },
        data:{status}
    })
}
export async function update_booked_slot_status(slot_id:string,status:string){
    return prisma.slot.update({
        where:{
            slot_id
        },
        data:{status}
    })
}