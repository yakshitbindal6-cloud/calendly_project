import {z} from "zod"
const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export const create_availabilityBaseSchema=z.object({
    weekday:z.int().min(0).max(6),
    start_time:z.string().regex(timeRegex, "Invalid time format, expected HH:mm"),
    end_time:z.string().regex(timeRegex, "Invalid time format, expected HH:mm"),
    timezone:z.string().default("UTC"),
    isActive:z.boolean().default(true),
})
export const create_availabilitySchema=create_availabilityBaseSchema.refine((data) => {
    const start = data.start_time.split(":").map(Number);
    const end = data.end_time.split(":").map(Number);
    return Number(start[0]) < Number(end[0]) || (Number(start[0]) === Number(end[0]) && Number(start[1]) < Number(end[1]));
}, {
    message: "End time must be after start time",
})
export const update_availabilitySchema=create_availabilityBaseSchema.partial()
export type CreateAvailabilityDto=z.infer<typeof create_availabilitySchema>
export type UpdateAvailabilityDto=z.infer<typeof update_availabilitySchema>