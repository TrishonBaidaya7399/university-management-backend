import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student/student.iterface';
import validator from 'validator';

// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    minlength: [3, 'First name should be minimum 3 characters'],
    maxlength: [20, 'First name should be maximum 20 characters'],
    validate: [
      {
        validator: function (value: string) {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return value === firstNameStr;
        },
        message: '{VALUE} is not in capitalize format',
      },
      {
        validator: (value: string) => validator.isAlpha(value, 'en-US'),
        message: '{VALUE} is not a valid naming format',
      },
    ],
  },
  middleName: {
    type: String,
    trim: true,
    validate: [
      {
        validator: function (value: string) {
          if (!value) return true;
          return validator.isAlpha(value, 'en-US');
        },
        message: '{VALUE} is not a valid naming format',
      },
      {
        validator: function (value: string) {
          if (!value) return true;
          return value.length >= 3 && value.length <= 20;
        },
        message:
          'Middle name should be minimum 3 characters and maximum 20 characters',
      },
      {
        validator: function (value: string) {
          if (!value) return true;
          const middleNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return value === middleNameStr;
        },
        message: '{VALUE} is not in capitalize format',
      },
    ],
  },
  lastName: {
    type: String,
    trim: true,
    validate: [
      {
        validator: function (value: string) {
          if (!value) return true;
          return validator.isAlpha(value, 'en-US');
        },
        message: '{VALUE} is not a valid naming format',
      },
      {
        validator: function (value: string) {
          if (!value) return true;
          return value.length >= 3 && value.length <= 20;
        },
        message:
          'Last name should be minimum 3 characters and maximum 20 characters',
      },
      {
        validator: function (value: string) {
          if (!value) return true;
          const lastNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return value === lastNameStr;
        },
        message: '{VALUE} is not in capitalize format',
      },
    ],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    min: [10, 'Phone number should be at least 10 digits'],
    max: [10, 'Phone number should be max 10 digits'],
    required: [true, 'father contact no is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'mother name is required'],
  },
  motherOccupation: { type: String, trim: true },
  motherContactNo: {
    type: String,
    trim: true,
    min: [10, 'Phone number should be at least 10 digits'],
    max: [10, 'Phone number should be max 10 digits'],
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'local guardian name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    min: [10, 'Phone number should be at least 10 digits'],
    max: [10, 'Phone number should be max 10 digits'],
    required: [true, 'local guardian contact no is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'local guardian address is required'],
  },
  relation: {
    type: String,
    trim: true,
    required: [true, 'local guardian relation is required'],
  },
});
const studentSchema = new Schema<TStudent>({
  _id: { type: String, required: [true, '_id is required'] },
  id: {
    type: String,
    trim: true,
    required: [true, 'id is required'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
    validate: [
      {
        validator: (email: string) => validator.isEmail(email),
        message: 'Please enter a valid email',
      },
    ],
  },
  contactNo: {
    type: String,
    trim: true,
    min: [10, 'Phone number should be at least 10 digits'],
    max: [10, 'Phone number should be max 10 digits'],
    required: [true, 'contact name is required'],
  },
  gender: {
    type: String,
    trim: true,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        '{VALUE} is not supported. Gender can only be following values - male, female, other',
    },
    required: true,
  },
  bloodGroup: {
    type: String,
    trim: true,
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
  dateOfBirth: { type: String, trim: true },
  profileImage: { type: String, trim: true },
  permanentAddress: { type: String, trim: true },
  presentAddress: { type: String, trim: true },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    required: [true, 'activity status is required'],
    default: 'active',
  },
  emergencyNo: { type: String, trim: true },
  guardian: { type: guardianSchema, required: [true, 'guardian is required'] },
  localGuardian: localGuardianSchema,
});

// 3. Create a Model.
export const StudentModel = model<TStudent>('Student', studentSchema);
