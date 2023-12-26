import express from 'express'
import { CourseControllers } from './course.controller';
import { validateData } from '../../middlewares/validateData';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
    '/', validateData(CourseValidation.CreateCourseValidationSchema), CourseControllers.createCourse,
);
router.get(
    '/', CourseControllers.getAllCourse,
);
router.get(
    '/:courseId/reviews', CourseControllers.getSingleCourse,
);
router.get(
    '/best', CourseControllers.getBestCourse,
);
router.put(
    '/:courseId', validateData(CourseValidation.UpdateValidationCourseSchema), CourseControllers.updateCourse,
);


export const CourseRoutes = router;