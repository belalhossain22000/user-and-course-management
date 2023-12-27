import { USER_ROLE } from "./user.constant";


// user interface
export interface TUser {
  username: string,
  email: string;
  password: string;
  role: 'admin' | 'user';

}

export type TLoginUser = {
  username: string;
  password: string;
};


export type TUserRole = keyof typeof USER_ROLE