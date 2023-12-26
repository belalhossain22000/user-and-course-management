
import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
    },
    {
        timestamps: true,
    },
);

export const CategoryModel = model<TCategory>(
    'Category',
    categorySchema,
);