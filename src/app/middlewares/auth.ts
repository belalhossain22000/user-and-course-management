import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../utils/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../modules/user/user.model';


const auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        // checking if the token is missing
        if (!token) {
            throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized!');
        }

        jwt.verify(token, config.jwt_access_secret as string, async (err, decoded) => {
            
            const { role, _id } = decoded as JwtPayload;


            try {
                // check if the user exists
                const isUserExist = await UserModel.findById(_id).select("-password");

                if (!isUserExist) {
                    throw new AppError(httpStatus.NOT_FOUND, "User not found ")
                }

                if (requiredRole.length && !requiredRole.includes(role)) {
                    throw new AppError(httpStatus.BAD_REQUEST, 'You are not authorized!');
                }

                // setting user in request 
                req.user = decoded as JwtPayload;

                next();
            } catch (error) {
                
                next(error);
            }
        });

    });
};

export default auth;

