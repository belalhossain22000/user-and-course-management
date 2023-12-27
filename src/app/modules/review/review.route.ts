import express from 'express'
import { CourseReviewControllers } from './review.controller';
import { ReviewValidation } from './review.validation';
import { validateData } from '../../middlewares/validateData';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
    '/',auth("user"), validateData(ReviewValidation.CreteReviewValidationSchema), CourseReviewControllers.createCourseReview,
);


export const CourseReviewRoutes = router;