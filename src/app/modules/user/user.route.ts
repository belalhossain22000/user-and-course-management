import express from 'express'
import { validateData } from '../../middlewares/validateData';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';


const router = express.Router();

// register user
router.post(
    '/register', validateData(UserValidation.userValidationSchema),
    UserControllers.createUser
);

// login user
router.post(
    '/login', validateData(UserValidation.loginUserValidationSchema),
    UserControllers.loginUser
);

// change user password
router.post(
    '/change-password', validateData(UserValidation.changePasswordValidationSchema),
    UserControllers.changePassword
);


export const UserRoutes = router;