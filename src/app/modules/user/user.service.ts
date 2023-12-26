import { TLoginUser, TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt';




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

    const result = {
        _id: user?._id,
        username: user?.username,
        email: user?.email,
        role: user?.role
    }

    return result


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