import { Router } from 'express';
import { CategoryRoutes } from '../modules/category/category.route';
import { CourseRoutes } from '../modules/course/course.route';
import { CourseReviewRoutes } from '../modules/review/review.route';
import { UserRoutes } from '../modules/user/user.route';


const router = Router();


const moduleRoutes = [
    {
        path: '/categories',
        route: CategoryRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/reviews',
        route: CourseReviewRoutes,
    },
    {
        path: '/auth',
        route: UserRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;




