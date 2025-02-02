/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserServices } from './user.service';
import { TStudent } from '../student/student.iterface';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;
  // const validatedStudentsData = UserValidation.parse(studentData);
  const result = await UserServices.createStudentIntoDB(
    password,
    student as TStudent,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully!',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
