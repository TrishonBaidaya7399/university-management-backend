import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.iterface';

// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  middleName: { type: String },
  lastName: { type: String },
});
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'father contact no is required'],
  },
  motherName: { type: String, required: [true, 'mother name is required'] },
  motherOccupation: { type: String },
  motherContactNo: { type: String },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'local guardian name is required'] },
  occupation: {
    type: String,
    required: [true, 'local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'local guardian contact no is required'],
  },
  address: {
    type: String,
    required: [true, 'local guardian address is required'],
  },
  relation: {
    type: String,
    required: [true, 'local guardian relation is required'],
  },
});
const studentSchema = new Schema<TStudent>({
  _id: { type: String, required: [true, '_id is required'] },
  id: { type: String, required: [true, 'id is required'], unique: true },
  name: { type: userNameSchema, required: [true, 'name is required'] },
  email: { type: String, required: [true, 'email is required'], unique: true },
  contactNo: { type: String, required: [true, 'contact name is required'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        '{VALUE} is not supported. Gender can only be following values - male, female, other',
    },
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: [
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
      message:
        '{VALUE} is not supported. Blood group can only be following values - A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
    },
  },
  dateOfBirth: { type: String },
  profileImage: { type: String },
  permanentAddress: { type: String },
  presentAddress: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    required: [true, 'activity status is required'],
    default: 'active',
  },
  emergencyNo: { type: String },
  guardian: { type: guardianSchema, required: [true, 'guardian is required'] },
  localGuardian: localGuardianSchema,
});

// 3. Create a Model.
export const StudentModel = model<TStudent>('Student', studentSchema);
