import{z} from "zod"
export const create_eventScema=z.object({
    duration:z.number().min(15).max(120).default(30),
    title:z.string().min(1,"title is required").max(100,"title must be less than 100 characters"),
    slug:z.string()
        .min(1,"slug is required")
        .max(150,"slug must be less than 150 characters")
        .regex(/^[a-z0-9-]+$/, "slug can only contain lowercase letters, numbers, and hyphens").optional(),
    description:z.string().max(1000).optional(),
    isActive:z.boolean().default(true),
    locationType:z.enum(["online","in-person"]).default("online"),
    locationValue:z.string().optional(),
    bufferbeforeTime:z.number().min(0).max(120).default(0),
    bufferafterTime:z.number().min(0).max(120).default(0),
})

export const update_eventScema= create_eventScema.partial()
export type create_eventDto=z.infer<typeof create_eventScema>
export type update_eventDto=z.infer<typeof update_eventScema>