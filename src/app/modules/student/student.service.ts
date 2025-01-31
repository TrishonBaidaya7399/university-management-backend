import { TStudent } from './student.iterface';
import { StudentModel } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id: id });
  const result = await StudentModel.aggregate([{ $match: { id: id } }]);
  return result;
};
const updateSingleStudentIntoDB = async (_id: string, student: TStudent) => {
  const result = await StudentModel.findByIdAndUpdate(_id, student, {
    new: true,
    runValidators: true, // Ensure the updated document is returned and validators are applied
  });
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
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateSingleStudentIntoDB,
  deleteSingleStudentFromDB,
};
