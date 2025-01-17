import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from '../Student.validation';
import studentValidationSchema from './Student.validation.ZOD';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    // ------------- Validate data using Joi validator ------------------------
    // const { error, value } = studentValidationSchema.validate(studentData);
    // if (error) {
    //   console.error(error);
    //   res.status(500).json({
    //     success: false,
    //     message: 'Failed to created student',
    //     error: error,
    //   });
    // }
    // -------------------------------------------------------------------------

    // ------------- Validate data using Zod validator ------------------------

    const validatedStudentsData = studentValidationSchema.parse(studentData);

    // ------------------------------------------------------------------------
    console.log(validatedStudentsData);
    const result = await StudentServices.createStudentIntoDB(
      validatedStudentsData,
    );
    //send res
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to created student',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve students data',
      error: error,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
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
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve student data',
      error: error,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params._id;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete student',
      error: error,
    });
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
