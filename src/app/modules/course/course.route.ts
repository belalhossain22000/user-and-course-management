import express from 'express'
import { CourseControllers } from './course.controller';
import { validateData } from '../../middlewares/validateData';
import { CourseValidation } from './course.validation';
import auth from '../../middlewares/auth';


const router = express.Router();


// create course admin can only create course
router.post(
    '/', auth("admin"), validateData(CourseValidation.CreateCourseValidationSchema), CourseControllers.createCourse,
);

// get all course using searching filtering
router.get(
    '/', CourseControllers.getAllCourse,
);

// get course by course id with review
router.get(
    '/:courseId/reviews', CourseControllers.getSingleCourse,
);

// get best course based on course review
router.get(
    '/best', CourseControllers.getBestCourse,
);

// update course by course id admin can only update a course
router.put(
    '/:courseId', validateData(CourseValidation.UpdateValidationCourseSchema), CourseControllers.updateCourse,
);


export const CourseRoutes = router;