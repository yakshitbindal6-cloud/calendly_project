import { prisma } from "../config/database.js";
export async function findBookedSlotsByHostInRange(user_id:number,start_date:Date,end_date:Date){
    return prisma.slot.findMany({
        where:{
            user_id,
            start_time:{
                gte:start_date,
                lte:end_date
            },
            is_booked:true
        },
    })
}