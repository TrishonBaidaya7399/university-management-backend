import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemeter.model';

const createAcademicSemesterIntoDB = async (data: TAcademicSemester) => {
  const newAcademicSemester = AcademicSemesterModel.create(data);
  return newAcademicSemester;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
