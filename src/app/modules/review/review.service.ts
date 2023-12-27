import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const createCourseReviewIntoDB = async (userData: JwtPayload, payload: TReview) => {
    const result = await ReviewModel.create({ ...payload, createdBy: userData?._id });
    await result.populate({
        path: 'createdBy',
        select: '-password -createdAt -updatedAt',
    })
    return result;
};

export const CourseReviewService = {
    createCourseReviewIntoDB
}