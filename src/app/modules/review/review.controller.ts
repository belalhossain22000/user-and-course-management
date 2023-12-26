
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { CourseReviewService } from "./review.service";

const createCourseReview = catchAsync(async (req, res) => {
    const result = await CourseReviewService.createCourseReviewIntoDB(
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Review created successfully',
        data: result,
    });
});


export const CourseReviewControllers = {
    createCourseReview
};