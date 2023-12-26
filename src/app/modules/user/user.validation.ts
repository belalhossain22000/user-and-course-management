import { z } from "zod";

const userValidationSchema = z.object({
    username: z.string().nonempty({ message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(4, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password cannot be more than 20 characters long' })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{4,}$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long',
      })
      .optional(),
  });

  export const UserValidation = {
    userValidationSchema,
  };