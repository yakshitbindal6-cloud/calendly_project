import {z} from "zod"
export const userSchema = z.object({
    email: z.email("Invalid email address"),
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters")
})
export const removeUserSchema = z.object({
    id: z.coerce.number().int().positive("Invalid user ID")
})
export const updateUserSchema = z.object({
    email: z.email("Invalid email address").optional(),
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters").optional()
}).refine((data) => data.email || data.name, {
    message: "At least one of email or name must be provided",  
})
export type CreateUserDto = z.infer<typeof userSchema>
export type RemoveUserDto = z.infer<typeof removeUserSchema>
export type UpdateUserDto = z.infer<typeof updateUserSchema>