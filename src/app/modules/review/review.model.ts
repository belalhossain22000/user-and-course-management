import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    rating: {
        type: Number,
        required: true, min: 1, max: 5
    },
    review: {
        type: String,
        required: true
    },
});

// Compile the model using the schema
export const ReviewModel = model<TReview>('Review', reviewSchema);
