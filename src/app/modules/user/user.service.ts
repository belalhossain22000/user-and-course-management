
import config from "../../config";
import { PasswordHistoryModel } from "../passwordHistory/passwordHistory.model";
import { PasswordHistory, TLoginUser, TUser, UserDocument } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { newPasswordValidationSchema } from "./user.validation";




// create user /register user
const createUserIntoDB = async (payload: TUser) => {

    const isUserExist = await UserModel.findOne({ email: payload?.email })

    if (isUserExist) {
        throw new Error("User already exist")
    }

    const result = await UserModel.create(payload) as UserDocument

    if (!result) {
        throw new Error("something went wrong user not crated")
    }

    // collecting password for history 
    const PasswordHistorySave = await PasswordHistoryModel.create({
        userId: result?._id,
        passwordHash: result?.password,
        timestamp: Date.now()
    })

    if (!PasswordHistorySave) {
        throw new Error("Something went wrong ")
    }


    const returnUser = {
        _id: result?._id,
        username: result?.username,
        email: result?.email,
        role: result?.role,
        createdAt: result?.createdAt,
        updatedAt: result?.updatedAt,
    }
    return returnUser

}


// handle login 
const loginUser = async (payload: TLoginUser) => {

    const { username, password } = payload;

    // Find the user by email in the database
    const user = await UserModel.findOne({ username });


    if (!user) {
        throw new Error(` User not found `)
    }
    // Compare the provided password 
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid password")
    }

    const jwtPayload = {
        _id: user._id,
        email: user?.email,
        role: user?.role
    }

    const returnUser = {
        _id: user?._id,
        username: user?.username,
        email: user?.email,
        role: user?.role
    }

    // generate access token

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: "30d" })

    return {
        returnUser,
        accessToken
    }


};

// change password
const changePasswordIntoDB = async (userData: JwtPayload, payload: { currentPassword: string, newPassword: string }) => {


    // // Find the user by email in the database
    const user = await UserModel.findOne({ _id: userData?._id });

    // // check the user is exist
    if (!user) {
        throw new Error(` User not found `)
    }
    //  Compare the provided password 
    const passwordMatch = await bcrypt.compare(payload.currentPassword, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid password")
    }

    // Check if the new password matches any of the previous 2 passwords or the current one
    const previousPasswords: PasswordHistory[] = await PasswordHistoryModel.find({ userId: user._id })
        .sort({ timestamp: -1 })
        .limit(2);


    // checking is password is match last two password or current one
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const isPasswordRepeated = previousPasswords.some(prevPassword => {
        const isMatch = bcrypt.compareSync(payload.newPassword, prevPassword.passwordHash);
        if (isMatch) {
            const formattedTimestamp = prevPassword.timestamp.toLocaleString();
            throw new Error(`Password change failed. Ensure the new password is unique and not among the last 2 used and current one  (last used on ${formattedTimestamp}).`);
        }
        return isMatch;
    });

    newPasswordValidationSchema.parse({ newPassword: payload.newPassword });
    //  hashing new password

    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.password_salt_rounds))

    const result = await UserModel.findOneAndUpdate(
        { _id: user?._id, email: user?.email, role: user?.role },
        { password: newHashedPassword, },
        { new: true }
    ).select("-password")

    return result
}

export const UserService = {
    createUserIntoDB,
    loginUser,
    changePasswordIntoDB
}