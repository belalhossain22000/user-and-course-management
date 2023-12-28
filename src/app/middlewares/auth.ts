import jwt, { JwtPayload } from 'jsonwebtoken';

import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../utils/AppError';
import httpStatus from 'http-status';


const auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        // checking if the token is missing
        if (!token) {
            throw new AppError(httpStatus.BAD_REQUEST,'You are not authorized!');
        }

        jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
            if (err) {
                throw new AppError(httpStatus.BAD_REQUEST,'You are not authorized!');
            }
       
            const role = (decoded as JwtPayload).role

            if (requiredRole && !requiredRole.includes(role)) {
                throw new AppError(httpStatus.BAD_REQUEST,'You are not authorized!');
            }

            // setting user in request 
            req.user = decoded as JwtPayload
           
            next();
        })

    });
};

export default auth;
