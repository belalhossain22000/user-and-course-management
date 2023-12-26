import { Schema, model } from "mongoose";
import { TCourse, TCourseModel } from "./course.interface";

const courseSchema = new Schema<TCourse>({
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: { type: Number, required: true },
    tags: [
        {
            name: {
                type: String,
                required: true
            },
            isDeleted: {
                type: Boolean,
                required: true
            },
        },
    ],
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    durationInWeeks: {
        type: Number,
        required: true
    },
    details: {
        level: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
});

//creating a custom static method
courseSchema.statics.isCourseExists = async function (id: string) {
    const existingCourse = await CourseModel.findOne({ _id: id });
    return existingCourse;
};

// Compile the model using the schema
export const CourseModel = model<TCourse, TCourseModel>('Course', courseSchema);