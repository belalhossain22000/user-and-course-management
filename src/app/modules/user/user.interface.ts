import { Document, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";


// user interface
export interface TUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';

}

export type TLoginUser = {
  username: string;
  password: string;
};

export interface UserDocument extends Document, TUser {
  createdAt?: Date;
  updatedAt?: Date;
}

export type PasswordHistory = {
  userId: Types.ObjectId; 
  passwordHash: string;
  timestamp: Date;
};
export type TUserRole = keyof typeof USER_ROLE