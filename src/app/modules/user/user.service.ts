import config from "../../config";
import { TLoginUser, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'




// create user /register user
const createUserIntoDB = async (payload: TUser) => {

    const result = await UserModel.create(payload)

    if (!result) {
        throw new Error("something went wrong user not crated")
    }

    return result

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
        username: user?.username,
        role: user?.role
    }

    // generate access token

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: "30d" })

    return {
        accessToken
    }


};

// change password
const changePasswordIntoDB = () => {
    return null
}

export const UserService = {
    createUserIntoDB,
    loginUser,
    changePasswordIntoDB
}