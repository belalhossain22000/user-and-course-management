import { z } from "zod";


// user registration schema
const userValidationSchema = z.object({
    username: z.string().nonempty({ message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
        .string({
            invalid_type_error: 'Password must be a string',
        })
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(20, { message: 'Password cannot be more than 20 characters long' })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, {
            message:
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long',
        }),

});


//   login user validation schema

const loginUserValidationSchema = z.object({
    username: z.string(),
    password: z.string()
})

// change password schema
const changePasswordValidationSchema = z.object({

    currentPassword: z.string({
        required_error: 'Current password is required',
    }),
    newPassword: z.string({ required_error: 'new Password is required' }),

});

// new password validation shcema
export const newPasswordValidationSchema = z.object({
    newPassword: z
        .string({
            invalid_type_error: 'Password must be a string',
        })
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(20, { message: 'Password cannot be more than 20 characters long' })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, {
            message:
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long',
        }),

})

export const UserValidation = {
    userValidationSchema,
    loginUserValidationSchema,
    changePasswordValidationSchema
};