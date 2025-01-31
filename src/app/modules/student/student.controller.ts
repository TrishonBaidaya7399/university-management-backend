import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from '../Student.validation';
import studentValidationSchema from './Student.validation.ZOD';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.id;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    if (result.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No student found with this id',
        data: result,
      });
    } else if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Retrieved student data successfully',
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { _id: studentId } = req.params;
    const updatedData = req.body;
    console.log({ ControllerId: studentId, controllerData: updatedData });
    const validatedStudentsData = studentValidationSchema.parse(updatedData);
    const result = await StudentServices.updateSingleStudentIntoDB(
      studentId,
      validatedStudentsData,
    );
    res.status(200).json({
      success: true,
      message: !result
        ? 'Student not found or failed to update'
        : 'Student is updated successfully',
      data: result ? result : [],
    });
  } catch (error) {
    next(error);
  }
};
const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params._id;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
