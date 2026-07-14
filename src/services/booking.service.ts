import type { createBooking_dto, listHostBookingQuery } from "../dtos/booking_dto.js";
import {
    createBookingWithDetails,
    findSlotById,
    lockSlotRowForUpdate,
    markSlotBooked,
    markSlotBookedIfAvailable,
    runBookingTransaction,
    findHostBookings,
    bookingCancel,
    findBookingById
} from "../repositories/booking.repository.js";
import { StartBookingCancellationNotificationWorkflow, StartBookingNotificationWorkflow } from "../temporal/client.js";
import { badRequest, notFound } from "../utils/api_error.js";
import { slotRegeneration } from "./slot.service.js";
async function triggerSlotregen(host_id:number,slot_start:Date){
    const start_time=slot_start.toISOString().split("T")[0];
        await slotRegeneration({host_id,from:start_time,to:start_time });
}
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
    await triggerSlotregen(user_id,booking.slot.start_time);
    await StartBookingNotificationWorkflow(booking.booking_id);
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
    await triggerSlotregen(user_id,booking.slot.start_time);
    await StartBookingNotificationWorkflow(booking.booking_id);
    return {
        booking:{
        id:booking.booking_id,
        status:booking.status,
        start_time:booking.slot.start_time.toISOString(),
        end_time:booking.slot.end_time.toISOString(),
    }
    }
}

export async function list_host_bookings(host_id: number, query: listHostBookingQuery) {
  const filters = {
    status: query.status,
    from: query.from ? new Date(query.from) : undefined,
    to: query.to ? new Date(query.to) : undefined,
  };

  const bookings = await findHostBookings(host_id, filters);

  return bookings.map((booking) => ({
    id: booking.booking_id,
    guestName: booking.guestName,
    guestEmail: booking.guestEmail,
    status: booking.status,
    startTime: booking.slot.start_time.toISOString(),
    endTime: booking.slot.end_time.toISOString(),
    eventTitle: booking.event.title,
    createdAt: booking.createAt.toISOString(),
  }));
}
export async function Cancel_booking(host_id:number,booking_id:number){
    const booking = await findBookingById(booking_id);
    if(!booking){
        throw notFound("booking not found");
    }
    if(booking.status==="Cancelled"){
        throw badRequest("booking is already cancelled");
    }
    if(booking.slot.start_time<new Date(Date.now()+24*60*60*1000)){
        throw badRequest("booking cannot be cancelled within 24 hours of the slot start time");
    }
    if(booking.user_id!==host_id){
        throw badRequest("you are not authorized to cancel this booking");
    }
    const updatedBooking = await bookingCancel(booking_id);
    await triggerSlotregen(host_id,updatedBooking.slot.start_time);
    await StartBookingCancellationNotificationWorkflow(updatedBooking.booking_id);
    return{
        booking:{
            booking_id:updatedBooking.booking_id,
            slot_id:updatedBooking.slot_id,
            status:updatedBooking.status,
            start_time:updatedBooking.slot.start_time.toISOString(),
            end_time:updatedBooking.slot.end_time.toISOString(),
        }
    }


}