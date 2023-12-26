


import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";


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


export const UserControllers = {
    createUser
};