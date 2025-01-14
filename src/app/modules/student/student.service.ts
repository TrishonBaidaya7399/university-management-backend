import { StudentModel } from '../student.model';
import { TStudent } from './student.iterface';

const createStudentIntoDB = async (student: TStudent) => {
  // const result = await StudentModel.create(student); // mongoose build in static method
  const studentInstance = new StudentModel(student); // creating an instance of the StudentModal
  const result = await studentInstance.save(); // mongoose build in instance method
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
