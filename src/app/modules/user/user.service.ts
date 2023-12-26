import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {

    const result = await UserModel.create(payload)

    if (!result) {
        throw new Error("something went wrong user not crated")
    }

    return result

}

export const UserService = {
    createUserIntoDB
}