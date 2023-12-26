import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { TUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: "user"
        },
    },
    {
        timestamps: true,
    },
);

// password hashing
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.password_salt_rounds),
    );

    next();
});


//remove password using post method
userSchema.post<TUser>('save', function (doc, next) {
    if (doc) {
        doc.password = "";
    }
    next();
});


// creating user model
export const UserModel = model<TUser>('User', userSchema);