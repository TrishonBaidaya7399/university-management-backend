/* eslint-disable @typescript-eslint/no-unused-vars */
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});
const getSingleStudent = catchAsync(async (req, res, next) => {
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
});

const updateSingleStudent = catchAsync(
  async (req, res, next): Promise<void> => {
    const { _id: studentId } = req.params;
    const updatedData = req.body;
    const result = await StudentServices.updateSingleStudentIntoDB(
      studentId,
      updatedData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: !result
        ? 'Student not found or failed to update'
        : 'Student is updated successfully',
      data: result ? result : [],
    });
  },
);

const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params._id;
  const result = await StudentServices.deleteSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteSingleStudent,
};
