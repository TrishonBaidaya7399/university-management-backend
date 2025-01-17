import { StudentModel } from '../student.model';
import { TStudent } from './student.iterface';

const createStudentIntoDB = async (student: TStudent) => {
  // For static instance method ----------------------------------------------------------------------------
  if (await StudentModel.isUserExists(student?.email)) {
    throw new Error(`User is exists with email ${student?.email}`);
  }
  const result = await StudentModel.create(student); // mongoose build in static method
  // For custom instance method ----------------------------------------------------------------------------
  // const studentInstance = new StudentModel(student); // creating an instance of the StudentModal
  // if (await studentInstance.isUserExists(student?.email as string)) {
  //   throw new Error(`User already registered with ${student?.email}`);
  // }
  // const result = await studentInstance.save(); // mongoose build in instance method
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id: id });
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteSingleStudentFromDB = async (_id: string) => {
  const result = await StudentModel.updateOne(
    { _id: _id },
    { isDeleted: true },
  );
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
