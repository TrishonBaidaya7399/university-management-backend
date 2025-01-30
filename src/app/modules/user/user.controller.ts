import { Request, Response } from 'express';
import { UserValidationSchema } from './user.validation.ZOD';

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

    const validatedStudentsData = UserValidationSchema.parse(studentData);

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
      message: (error as Error).message || 'Failed to created student',
      error: error,
    });
  }
};

export const UserControllers = {
  createStudent,
};
