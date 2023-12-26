import { z } from 'zod';

const createCategoryValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'category name must be string',
    })
})
const updatedCategoryValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'category name must be string',
    })
})

export const CategoryValidation = {
    createCategoryValidationSchema,
    updatedCategoryValidationSchema,
};