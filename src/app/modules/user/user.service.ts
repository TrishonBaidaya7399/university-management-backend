import config from '../../config';
import { TStudent } from '../student/student.iterface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.inteface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config?.default_password; //if password is not provided, use the default password
  userData.role = 'student'; // for creating student
  userData.id = '2030100002'; //manually generated id
  // create an user
  if (await UserModel.isUserExists(userData?.id)) {
    throw new Error(`User already exists `);
  }
  const newUser = await UserModel.create(userData);
  // create a student
  if (Object.keys(newUser)?.length > 0) {
    //set id and _id as user in the student data
    studentData.id = newUser?.id;
    studentData.user = newUser?._id; //reference _id
    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
