import type { createBooking_dto } from "../dtos/booking_dto.js";
import {
    createBookingWithDetails,
    findSlotById,
    lockSlotRowForUpdate,
    markSlotBooked,
    markSlotBookedIfAvailable,
    runBookingTransaction
} from "../repositories/booking.repository.js";
import { badRequest, notFound } from "../utils/api_error.js";
export async function create_booking_optimistic(user_id:number,data:createBooking_dto){
   const booking =await runBookingTransaction(async (tx) => {
        const slot=await findSlotById(tx,data.slot_id)
        if(!slot){
            throw notFound("slot not found");
        }
        if(slot.status!=="available"){
            throw notFound("slot is not available for booking");
        }
        if(slot.start_time<new Date()){
            throw badRequest("slot is in past, cannot be booked");
        }
        const update=await markSlotBookedIfAvailable(tx,data.slot_id)
        if(update.count!==1){
            throw badRequest("slot is not available for booking");
        }
        return createBookingWithDetails(tx,user_id,slot.event_id,data)
    })
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
   const booking = await runBookingTransaction(async (tx) => {
        const lockedSlotRow = await lockSlotRowForUpdate(tx,data.slot_id)

        if(lockedSlotRow.length===0){
            throw notFound('slot not found');
        }
        const slot=await findSlotById(tx,data.slot_id)
        if(!slot){
            throw notFound("slot not found");
        }
        if(slot.status!=="available"){
            throw badRequest("slot is not available for booking");
        }
        if(slot.start_time<new Date()){
            throw badRequest("slot is in past, cannot be booked");
        }

        await markSlotBooked(tx,data.slot_id);

        return createBookingWithDetails(tx,user_id,slot.event_id,data)
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