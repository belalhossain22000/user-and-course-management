import express from 'express'
import { CourseControllers } from './course.controller';
import { validateData } from '../../middlewares/validateData';
import { CourseValidation } from './course.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/', validateData(CourseValidation.CreateCourseValidationSchema), CourseControllers.createCourse,
);
router.get(
    '/',auth(), CourseControllers.getAllCourse,
);
router.get(
    '/:courseId/reviews', CourseControllers.getSingleCourse,
);
router.get(
    '/best',auth, CourseControllers.getBestCourse,
);
router.put(
    '/:courseId', validateData(CourseValidation.UpdateValidationCourseSchema), CourseControllers.updateCourse,
);


export const CourseRoutes = router;