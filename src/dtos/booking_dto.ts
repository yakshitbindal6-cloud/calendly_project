import {z} from "zod";
export const create_bookingSchema = z.object({
    slot_id:z.string(),
    guestName:z.string(),
    guestEmail:z.email(),
})
export type createBooking_dto=z.infer<typeof create_bookingSchema>

export const listHostBookingQuerySchema = z.object({
    status: z.string().optional(),
    from: z.iso.datetime().optional(),
    to: z.iso.datetime().optional(),
})
export type listHostBookingQuery = z.infer<typeof listHostBookingQuerySchema>

export const cancelBookingSchema = z.object({
    booking_id: z.number(),
})
export type cancelBooking_dto = z.infer<typeof cancelBookingSchema>