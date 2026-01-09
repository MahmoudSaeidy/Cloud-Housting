import * as z from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(2).max(50),
    username: z.string().min(2).max(50),
    email: z.string().min(3).max(100).email(),
    password:z.string().min(6)
});

export const loginUserSchema = z.object({
    email:z.string().min(2).max(50),
    password:z.string().min(6)
})
export const CreateCommentSchema = z.object({
    text : z.string().max(500)
})
export const updateProfileSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    username: z.string().min(2).max(50).optional(),
    email: z.string().min(3).max(100).email().optional(),
    password:z.string().min(6).optional()
});