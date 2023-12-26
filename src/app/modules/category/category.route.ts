import express from 'express'
import { CAtegoryControllers } from './category.controller';

import { CategoryValidation } from "./category.validation";
import { validateData } from '../../middlewares/validateData';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
    '/', validateData(CategoryValidation.createCategoryValidationSchema), CAtegoryControllers.createCategory,
);
router.get(
    '/',auth(), CAtegoryControllers.getAllCategory,
);

export const CategoryRoutes = router;