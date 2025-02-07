/* eslint-disable @typescript-eslint/no-unused-vars */
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';
import { TAcademicSemester } from './academicSemester.interface';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    data as TAcademicSemester,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Semester is created successfully!',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
