import express from 'express';
import { StudentControllers } from './student.controller';
const router = express.Router();
router.get('/get-all-students', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch('/update/:_id', StudentControllers.updateSingleStudent);
router.delete('/delete/:_id', StudentControllers.deleteSingleStudent);
export const StudentRoutes = router;
