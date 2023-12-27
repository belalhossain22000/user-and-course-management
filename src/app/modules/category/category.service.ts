import { JwtPayload } from "jsonwebtoken";
import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";



// created category route only admin can crete
const createCategoryIntoDB = async (userData: JwtPayload, payload: TCategory) => {

    const result = await CategoryModel.create({ ...payload, createdBy: userData?._id });
    return result;
};

// get all category route
const getAllCategoriesFromDB = async () => {
    const result = await CategoryModel.find().populate({
        path: 'createdBy',
        select: '-password -createdAt -updatedAt',
    });
    return result;
};

export const CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB
};
