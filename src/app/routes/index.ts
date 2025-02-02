import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();
const moduleRoutes = [
  { path: '/students', route: StudentRoutes },
  { path: '/users', route: UserRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
