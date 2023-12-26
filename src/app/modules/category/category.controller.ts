
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategoryIntoDB(
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Category is created successfully',
        data: result,
    });
});
const getAllCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoriesFromDB()


    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Categories retrieved successfully',
        data: result,
    });
});

export const CAtegoryControllers = {
    createCategory,
    getAllCategory
};
