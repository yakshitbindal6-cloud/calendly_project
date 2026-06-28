import{z} from "zod"
export const create_eventScema=z.object({
    user_id:z.number().int().positive("Invalid user ID"),
    duration:z.number(),
    title:z.string().min(1,"title is required").max(100,"title must be less than 100 characters"),
    slug:z.string().min(1,"slug is required").max(150,"slug must be less than 150 characters"),
    description:z.string().min(1,"description is required").max(100,"description must be less than 100 characters"),
    isActive:z.boolean(),
    locationType:z.string().min(1,"locationType is required").max(100,"locationType must be less than 100 characters"),
    locationValue:z.string().min(1,"location is required").max(100,"location must be less than 100 characters"),
    bufferbeforeTime:z.number(),
    bufferafterTime:z.number(),
})
export const user_eventScema=z.object({
    id: z.coerce.number().int().positive("Invalid user ID")
})
export const event_slugParams = z.object({
    slug: z.string().min(1, "Invalid event slug")
})
export type create_eventDto=z.infer<typeof create_eventScema>
export type user_eventsDto=z.infer<typeof user_eventScema>