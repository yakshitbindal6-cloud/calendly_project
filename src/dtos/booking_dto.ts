import {z} from "zod";
export const create_bookingSchema = z.object({
    slot_id:z.string(),
    guestName:z.string(),
    guestEmail:z.email(),
})
export type createBooking_dto=z.infer<typeof create_bookingSchema>