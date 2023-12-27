


import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";

// register user
const createUser = catchAsync(async (req, res) => {
    const result = await UserService.createUserIntoDB(
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'User created successfully',
        data: result,
    });
});

// login user 
const loginUser = catchAsync(async (req, res) => {
    const result = await UserService.loginUser(
        req.body,
    );

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'User login successfully',
        data: result,
    });
});

// chang user password
const changePassword = catchAsync(async (req, res) => {

   
    const { ...passwordData } = req.body;

    const result = await UserService.changePasswordIntoDB(req.user,passwordData);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: 'Password changed successfully',
        data: result,
    });
});

export const UserControllers = {
    createUser,
    loginUser,
    changePassword
};