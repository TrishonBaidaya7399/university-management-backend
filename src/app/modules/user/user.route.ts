import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../utils/validateRequest';
import { StudentValidations } from '../student/Student.validation.ZOD';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidations?.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
