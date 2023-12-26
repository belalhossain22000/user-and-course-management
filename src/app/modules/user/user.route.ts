import express from 'express'
import { validateData } from '../../middlewares/validateData';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';


const router = express.Router();

router.post(
    '/register', validateData(UserValidation.userValidationSchema),
    UserControllers.createUser
);


// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const alu ="ccc"
export const UserRoutes = router;