import express from 'express';
import { StudentControllers } from './student.controller';
import { StudentValidations } from './Student.validation.ZOD';
import validateRequest from '../../utils/validateRequest';
const router = express.Router();
router.get('/get-all-students', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch(
  '/update/:_id',
  validateRequest(StudentValidations?.createStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);
router.delete('/delete/:_id', StudentControllers.deleteSingleStudent);
export const StudentRoutes = router;
