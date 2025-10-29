import z from "zod";

export const registerSchema = z.object({
    identity: z.string().min(2, 'Email or Phone-number require'),
    firstName: z.string().min(2, 'first name is require'),
    lastName: z.string().min(2, 'last name is require'),
    password: z.string().min(4, 'password at least 4 characters'),
    confirmPassword: z.string().min(4, 'confirm password is require'),
}).refine(data  => data.password === data.confirmPassword, {
    message: 'confirmPassword must match password',
    path: ['confirmPassword']
})

