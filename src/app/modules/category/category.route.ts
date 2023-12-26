import express from 'express'
import { CAtegoryControllers } from './category.controller';

import { CategoryValidation } from "./category.validation";
import { validateData } from '../../middlewares/validateData';


const router = express.Router();

router.post(
    '/', validateData(CategoryValidation.createCategoryValidationSchema), CAtegoryControllers.createCategory,
);
router.get(
    '/', CAtegoryControllers.getAllCategory,
);

export const CategoryRoutes = router;