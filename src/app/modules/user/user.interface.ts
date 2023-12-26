

// user interface
export interface TUser {
    username:string,
    email: string;
    password: string;
    role: 'admin' | 'user';
   
  }

  export type TLoginUser = {
    username: string;
    password: string;
  };