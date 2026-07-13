import { prisma } from "../config/database.js";
import type { createBooking_dto } from "../dtos/booking_dto.js";
import { badRequest, notFound } from "../utils/api_error.js";
export async function create_booking_optimistic(user_id:number,data:createBooking_dto){
   const booking =await prisma.$transaction(
    async (tx) => {
        const slot=await prisma.slot.findUnique({
            where:{
                slot_id:data.slot_id
            }
        })
        if(!slot){
            throw notFound("slot not found");
        }
        if(slot.status!=="available"){
            throw notFound("slot is not available for booking");
        }
        if(slot.start_time<new Date()){
            throw badRequest("slot is in past, cannot be booked");
        }
        const update=await tx.slot.updateMany({
            where:{
                slot_id:data.slot_id,
                status:"available"
            },
            data:{
                status:"booked"
            }
        })
        if(update.count!==1){
            throw badRequest("slot is not available for booking");
        }
        return tx.booking.create({
            data:{
                user_id,
                event_id:slot.event_id,
                slot_id:data.slot_id,
                guestName:data.guestName,
                guestEmail:data.guestEmail,
                status:"Confirmed"
            },
            include:{
                slot:true,
                event:true
            }
        })
    }
)
    return {
        booking:{
        id:booking.booking_id,
        status:booking.status,
        start_time:booking.slot.start_time.toISOString(),
        end_time:booking.slot.end_time.toISOString(),
    }
    }
}

export async function create_booking_pessimistic(user_id:number,data:createBooking_dto){
   const booking = await prisma.$transaction(async (tx) => {
        const lockedSlotRow = await tx.$queryRaw<{slot_id:string;}[]>`
            SELECT slot_id
            FROM "slot"
            WHERE slot_id = ${data.slot_id}
            FOR UPDATE
        `;

        if(lockedSlotRow.length===0){
            throw notFound('slot not found');
        }
        const slot=await prisma.slot.findUnique({
            where:{
                slot_id:data.slot_id
            }
        })
        if(!slot){
            throw notFound("slot not found");
        }
        if(slot.status!=="available"){
            throw badRequest("slot is not available for booking");
        }
        if(slot.start_time<new Date()){
            throw badRequest("slot is in past, cannot be booked");
        }

        await tx.slot.update({
            where:{
                slot_id:data.slot_id
            },
            data:{
                status:"booked"
            }
        });

        return tx.booking.create({
            data:{
                user_id,
                event_id:slot.event_id,
                slot_id:data.slot_id,
                guestName:data.guestName,
                guestEmail:data.guestEmail,
                status:"Confirmed"
            },
            include:{
                slot:true,
                event:true
            }
        })
   });

    return {
        booking:{
        id:booking.booking_id,
        status:booking.status,
        start_time:booking.slot.start_time.toISOString(),
        end_time:booking.slot.end_time.toISOString(),
    }
    }
}