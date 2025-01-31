import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import { TStudent } from '../student/student.iterface';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;
    // const validatedStudentsData = UserValidation.parse(studentData);

    // ------------------------------------------------------------------------
    // console.log(validatedStudentsData);
    const result = await UserServices.createStudentIntoDB(
      password,
      student as TStudent,
    );
    //send res
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
