
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";


//create course with category
const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Course created successfully',
        data: result,
    });
});

//get all course with searching and filtering
const getAllCourse = catchAsync(async (req, res) => {



    const result = await CourseServices.getAllCourseFromDB(req.query);


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Courses retrieved successfully',
        meta: result.meta,
        data: result.courses,
    });
});

//get single course with review
const getSingleCourse = catchAsync(async (req, res) => {
    const courseId = req.params.courseId
    const result = await CourseServices.getSingleCourseFromDB(courseId);


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Course and Reviews retrieved successfully',
        data: result,
    });
});

//get best course based on review
const getBestCourse = catchAsync(async (req, res) => {

    const result = await CourseServices.getBestCourseFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Best course retrieved successfully',
        data: result,
    });
});

//update course by id
const updateCourse = catchAsync(async (req, res) => {
    const courseId = req.params.courseId;
    const updatedData = req.body
    const result = await CourseServices.updateCourseIntoDB(courseId, updatedData);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Course updated successfully',
        data: result,
    });
});

export const CourseControllers = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    getBestCourse,
    updateCourse
};
