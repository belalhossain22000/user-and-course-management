


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

    try {
        const { ...passwordData } = req.body;

        const result = await UserService.changePasswordIntoDB(req.user, passwordData);

        sendResponse(res, {
            success: true,
            statusCode: 201,
            message: 'Password changed successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        sendResponse(res, {
            success: false,
            statusCode: 400,
            message: error.message,
            data: null,
        });
    }

});

export const UserControllers = {
    createUser,
    loginUser,
    changePassword
};