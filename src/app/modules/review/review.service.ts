import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";
import { CourseModel } from "../course/course.model";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";

const createCourseReviewIntoDB = async (userData: JwtPayload, payload: TReview) => {

    // check is course exist 
    const isCourseExist = await CourseModel.findById(payload.courseId)

    if (!isCourseExist) {
        throw new AppError(httpStatus.NOT_FOUND, `Course not found with the id ${payload.courseId}`)
    }

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