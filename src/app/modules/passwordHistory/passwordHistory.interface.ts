import { Types } from "mongoose";

// Define a type for password history
export type PasswordHistory = {
    userId:Types.ObjectId; 
    passwordHash: string;
    timestamp: Date;
};
