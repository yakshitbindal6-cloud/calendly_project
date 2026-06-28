import {z} from "zod"
export const availability_Schema=z.object({
    user_id:z.number().int().positive("Invalid user ID"),
    day:z.string().min(1,"day is required").max(10,"Name must be less than 10 characters "),
    start_time:z.date(),
    end_time:z.date(),
    duration:z.number()
})
export type availability_dto=z.infer<typeof availability_Schema>