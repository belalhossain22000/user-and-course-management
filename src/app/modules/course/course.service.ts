/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";
import { ReviewModel } from "../review/review.model";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../user/user.model";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";
import { CategoryModel } from "../category/category.model";



//create course services
const createCourseIntoDB = async (userData: JwtPayload, payload: TCourse) => {

    const { startDate, endDate, categoryId } = payload;

    // checking is category exist
    const isCategoryExist = await CategoryModel.findById(categoryId)
    if (!isCategoryExist) {
        throw new AppError(httpStatus.NOT_FOUND, `Category not found with the id ${categoryId}`)
    }

    // Calculate durationInWeeks
    const start = new Date(startDate);
    const end = new Date(endDate);
    const millisecondsInWeek = 604800000;
    const durationInWeeks = Math.ceil((end.getTime() - start.getTime()) / millisecondsInWeek);

    //courseDataWithDuration
    const courseDataWithDuration: TCourse & { durationInWeeks: number } = {
        ...payload,
        durationInWeeks,
        createdBy: userData?._id
    };

    const result = await CourseModel.create(courseDataWithDuration);
    return result;
};

//get all course with searching and filtering
const getAllCourseFromDB = async (query: Record<string, unknown>) => {

    let {
        // eslint-disable-next-line prefer-const
        page = 1,
        // eslint-disable-next-line prefer-const
        limit = 10,
        // eslint-disable-next-line prefer-const
        sortBy = 'title',
        // eslint-disable-next-line prefer-const
        sortOrder = 'asc',
        // eslint-disable-next-line prefer-const
        minPrice,
        // eslint-disable-next-line prefer-const
        maxPrice,
        // eslint-disable-next-line prefer-const
        tags,
        // eslint-disable-next-line prefer-const
        startDate,
        // eslint-disable-next-line prefer-const
        endDate,
        // eslint-disable-next-line prefer-const
        language,
        // eslint-disable-next-line prefer-const
        provider,
        // eslint-disable-next-line prefer-const
        durationInWeeks,
        // eslint-disable-next-line prefer-const
        level,
    } = query;

    // Type assertions to indicate the variables' types
    const pageNumber = typeof page === 'string' ? +page : (page as number);
    const limitNumber = typeof limit === 'string' ? +limit : (limit as number);
    const skip = (pageNumber - 1) * limitNumber;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (minPrice !== undefined && maxPrice !== undefined) {
        filter.price = { $gte: +minPrice!, $lte: +maxPrice! };
    }


    if (tags) {
        filter['tags.name'] = tags;
    }

    if (startDate !== undefined && endDate !== undefined) {
        filter.startDate = { $gte: startDate, $lte: endDate };
    }

    if (language) {
        filter.language = language;
    }

    if (provider) {
        filter.provider = provider;
    }

    if (durationInWeeks) {
        filter.durationInWeeks = durationInWeeks;
    }

    if (level) {
        filter['details.level'] = level;
    }

    const sortCriteria: any = {};
    sortCriteria[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const courses = await CourseModel.find(filter).populate({
        path: 'createdBy',
        select: '-password -createdAt -updatedAt',
    })
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit as number);
    const totalCoursesCount = await CourseModel.countDocuments(filter);
    const meta = {
        page,
        limit,
        total: totalCoursesCount,
    }
    const returnData = { courses, meta }
    return returnData
}

//get single course with review
const getSingleCourseFromDB = async (courseId: string): Promise<void> => {

    const convertedId = new mongoose.Types.ObjectId(courseId);

    const result = await CourseModel.aggregate([
        {
            $match: {
                _id: convertedId
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { creatorId: '$createdBy' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$creatorId'] }
                        }
                    },
                    {
                        $project: {
                            password: 0,
                            updatedAt: 0,
                            createdAt: 0
                        }
                    }
                ],
                as: 'createdBy'
            }
        },
        {
            $unwind: '$createdBy'
        },
        {
            $lookup: {
                from: 'reviews',
                localField: '_id',
                foreignField: 'courseId',
                as: 'reviews'
            }
        },

    ]);

    if (result.length > 0) {
        const foundCourse = await result[0];

        // Fetching user details for each review's createdBy field
        const reviewPromises = foundCourse.reviews.map(async (review: any) => {
            const userId = review.createdBy;

            // Fetch user details using userId from the 'users' collection
            const userDetails = await UserModel.findOne({ _id: userId }, { password: 0, updatedAt: 0, createdAt: 0 });

            if (userDetails) {
                review.createdBy = userDetails; 
            } else {
                throw new AppError(httpStatus.NOT_FOUND, `User not found with the id ${userId}`);
            }
            return review;
        });

        
        const populatedReviews = await Promise.all(reviewPromises);

        
        foundCourse.reviews = populatedReviews;

        return foundCourse;
    } else {
        throw new AppError(httpStatus.NOT_FOUND, `Course not found with the id ${courseId}`)
    }

}

//get best course based on review
const getBestCourseFromDB = async () => {
    const result = await ReviewModel.aggregate([

        {
            $group: {
                _id: '$courseId',
                averageRating: { $avg: '$rating' },
                reviewCount: { $sum: 1 },
            },
        },
        {
            $sort: { averageRating: -1, reviewCount: -1 },
        },

        {
            $lookup: {
                from: 'courses',
                localField: '_id',
                foreignField: '_id',
                as: 'course',
            },
        },
        {
            $unwind: '$course',
        },
        // {
        //     $lookup: {
        //         from: 'users',
        //         let: { creatorId: '$course.createdBy' },
        //         pipeline: [
        //             {
        //                 $match: {
        //                     $expr: { $eq: ['$_id', '$$creatorId'] }
        //                 }
        //             },
        //             {
        //                 $project: {
        //                     password: 0,
        //                     updatedAt: 0,
        //                     createdAt: 0
        //                 }
        //             }
        //         ],
        //         as: 'createdBy',
        //     },
        // },
        // {
        //     $unwind: '$createdBy',
        // },

    ]);



    if (result.length > 0) {
        const bestCourse = result[0];

        const userId = bestCourse.course.createdBy;
        // Fetch user details using userId from the 'users' collection
        const userDetails = await UserModel.findOne({ _id: userId }, { password: 0, updatedAt: 0, createdAt: 0 });

        if (userDetails) {
            bestCourse.course.createdBy = userDetails;
            return bestCourse
        } else {
            throw new AppError(httpStatus.NOT_FOUND, `User not found with the id ${userId}`);
        }

    } else {
        return "Course not found"
    }

}

//update course with course id
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {

    // checking is course is exist
    const existCourse = await CourseModel.isCourseExists(id)
    if (!existCourse) {
        throw new AppError(httpStatus.NOT_FOUND, `Course not found with the id ${id}`)
    }
    const { tags, details, endDate, startDate, ...courseRemainingData } = payload;

    // Calculate durationInWeeks
    if (startDate !== undefined && endDate !== undefined) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const millisecondsInWeek = 604800000;
        const durationInWeeks = Math.ceil((end.getTime() - start.getTime()) / millisecondsInWeek);

        courseRemainingData.durationInWeeks = durationInWeeks
    }


    // Updating basic course info 
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
        id,
        courseRemainingData,
        { new: true, runValidators: true }
    );

    // Updating  details if provided
    if (details) {
        await CourseModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    'details.level': details.level,
                    'details.description': details.description,
                },
            },
            { new: true, runValidators: true }
        );
    }

    // Updating tags here
    if (tags && tags.length > 0) {
        const existingTags = updateBasicCourseInfo?.tags.map((tag) => tag.name);

        for (const tag of tags) {
            if (tag.name && !tag.isDeleted) {
                if (!existingTags?.includes(tag.name)) {
                    // If tag with the same name does not exist add it
                    await CourseModel.findByIdAndUpdate(
                        id,
                        { $addToSet: { tags: tag } },
                        { runValidators: true }
                    );
                } else {
                    // If tag exists, update its properties 
                    await CourseModel.findOneAndUpdate(
                        { _id: id, 'tags.name': tag.name },
                        { $set: { 'tags.$.isDeleted': false } },
                        { runValidators: true }
                    );
                }
            } else if (tag.name && tag.isDeleted) {
                // Remove tag with isDeleted: true
                await CourseModel.findOneAndUpdate(
                    { _id: id, 'tags.name': tag.name },
                    { $pull: { tags: { name: tag.name } } },
                    { runValidators: true }
                );
            }
        }
    }

    //  return the updated course 
    const updatedCourse = await CourseModel.findById(id).populate({
        path: 'createdBy',
        select: '-password -createdAt -updatedAt',
    });
    return updatedCourse;

};



export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    getBestCourseFromDB,
    updateCourseIntoDB
};
