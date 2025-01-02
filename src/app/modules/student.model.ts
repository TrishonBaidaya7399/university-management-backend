import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.iterface';

// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String },
  fatherOccupation: { type: String },
  fatherContactNo: { type: String },
  motherName: { type: String },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String },
  occupation: { type: String },
  contactNo: { type: String },
  address: { type: String },
  relation: { type: String },
});
const studentSchema = new Schema<TStudent>({
  _id: { type: String, required: true },
  id: { type: String, required: true },
  name: userNameSchema,
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  gender: ['male', 'female', 'other'],
  bloodGroup: [
    'A',
    'A+',
    'A-',
    'B',
    'B+',
    'B-',
    'AB',
    'AB+',
    'AB-',
    'O',
    'O+',
    'O-',
  ],
  dateOfBirth: { type: String },
  profileImage: { type: String },
  permanentAddress: { type: String },
  presentAddress: { type: String },
  isActive: ['active', 'inactive'],
  emergencyNo: { type: String },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
});

// 3. Create a Model.
export const StudentModel = model<TStudent>('Student', studentSchema);
