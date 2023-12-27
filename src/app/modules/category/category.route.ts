import express from 'express'
import { CAtegoryControllers } from './category.controller';

import { CategoryValidation } from "./category.validation";
import { validateData } from '../../middlewares/validateData';
import auth from '../../middlewares/auth';


const router = express.Router();

// create category route only admin can create a category
router.post(
    '/',auth("admin"), validateData(CategoryValidation.createCategoryValidationSchema), CAtegoryControllers.createCategory,
);

// get all category 
router.get(
    '/', CAtegoryControllers.getAllCategory,
);

export const CategoryRoutes = router;