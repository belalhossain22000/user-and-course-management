import { Types } from "mongoose";

// Define a type for password history
export type PasswordHistory = {
    userId:Types.ObjectId; 
    passwordHash: string;
    passwordChangeAt:string;
    timestamp: Date;
};

// hello word
