import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from '../Student.validation';
import studentValidationSchema from './Student.validation.ZOD';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
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
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'No student found with this id',
        data: result,
      });
    } else if (result.length > 0) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
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

    sendResponse(res, {
      statusCode: httpStatus.OK,
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

    sendResponse(res, {
      statusCode: httpStatus.OK,
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
