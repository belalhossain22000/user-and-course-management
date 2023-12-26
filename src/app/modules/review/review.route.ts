import express from 'express'
import { CourseReviewControllers } from './review.controller';
import { ReviewValidation } from './review.validation';
import { validateData } from '../../middlewares/validateData';


const router = express.Router();

router.post(
    '/', validateData(ReviewValidation.CreteReviewValidationSchema), CourseReviewControllers.createCourseReview,
);


export const CourseReviewRoutes = router;