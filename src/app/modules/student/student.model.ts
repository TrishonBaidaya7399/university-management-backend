import { Schema, model } from 'mongoose';
// import bcrypt from 'bcrypt';
import argon2 from 'argon2';
import {
  IStudentModal,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // TStudentMethods,
  // TStudentModel,
  TUserName,
} from './student.iterface';
// import config from '../config';
// import { required } from 'joi';
// import validator from 'validator';

// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    minlength: [3, 'First name should be minimum 3 characters'],
    maxlength: [20, 'First name should be maximum 20 characters'],
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //       return value === firstNameStr;
    //     },
    //     message: '{VALUE} is not in capitalize format',
    //   },
    //   {
    //     validator: (value: string) => validator.isAlpha(value, 'en-US'),
    //     message: '{VALUE} is not a valid naming format',
    //   },
    // ],
  },
  middleName: {
    type: String,
    trim: true,
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return validator.isAlpha(value, 'en-US');
    //     },
    //     message: '{VALUE} is not a valid naming format',
    //   },
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return value.length >= 3 && value.length <= 20;
    //     },
    //     message:
    //       'Middle name should be minimum 3 characters and maximum 20 characters',
    //   },
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       const middleNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //       return value === middleNameStr;
    //     },
    //     message: '{VALUE} is not in capitalize format',
    //   },
    // ],
  },
  lastName: {
    type: String,
    trim: true,
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return validator.isAlpha(value, 'en-US');
    //     },
    //     message: '{VALUE} is not a valid naming format',
    //   },
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return value.length >= 3 && value.length <= 20;
    //     },
    //     message:
    //       'Last name should be minimum 3 characters and maximum 20 characters',
    //   },
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       const lastNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //       return value === lastNameStr;
    //     },
    //     message: '{VALUE} is not in capitalize format',
    //   },
    // ],
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
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return validator.isAlpha(value, 'en-US');
    //     },
    //     message: 'Local guardian name is required',
    //   },
    // ],
  },
  occupation: {
    type: String,
    trim: true,
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return validator.isAlpha(value, 'en-US');
    //     },
    //     message: 'Local guardian occupation is required',
    //   },
    // ],
  },
  contactNo: {
    type: String,
    trim: true,
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return validator.isNumeric(value);
    //     },
    //     message: '{VALUE} is not a valid phone number',
    //   },
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return value.length === 10;
    //     },
    //     message:
    //       'Phone number should be 10 digits long. Please enter a valid phone number',
    //   },
    // ],
  },
  address: {
    type: String,
    trim: true,
  },
  relation: {
    type: String,
    trim: true,
    // validate: [
    //   {
    //     validator: function (value: string) {
    //       if (!value) return true;
    //       return validator.isAlpha(value);
    //     },
    //     message:
    //       '{VALUE} is not a valid relation. Please enter a valid relation',
    //   },
    // ],
  },
});
const studentSchema = new Schema<TStudent, IStudentModal>(
  {
    // , TStudentModel, TStudentMethods
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
      // validate: [
      //   {
      //     validator: (email: string) => validator.isEmail(email),
      //     message: 'Please enter a valid email',
      //   },
      // ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    contactNo: {
      type: String,
      trim: true,
      // min: [10, 'Phone number should be at least 10 digits'],
      // max: [10, 'Phone number should be max 10 digits'],
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
    guardian: {
      type: guardianSchema,
      required: [true, 'guardian is required'],
    },
    localGuardian: localGuardianSchema,
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual ------------- for populating data ------------------------
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}${this.name.middleName && ` ${this.name.middleName}`}${this.name.lastName && ` ${this.name.lastName}`}`;
});

// Middleware are mainly of 4 types - 1. Document Middleware (like: 'save'), 2. Query Middleware, 3. Aggregate Middleware, 4. Schema Middleware
//
// pre save middleware / hook : will work on create() | save() ----------------------------------------
studentSchema.pre('save', async function (next) {
  // this.password = await bcrypt.hash(
  this.password = await argon2.hash(
    this?.password,
    {
      type: argon2.argon2d,
      memoryCost: 2 ** 16,
      hashLength: 50,
    },
    // Number(config.bcrypt_salt_rounds),
  );
  console.log(this, 'pre hook: Data before saving');
  next();
});
// post save middleware / hook ----------------------------------------
studentSchema.post('save', function (doc, next) {
  doc.password = ''; // after saving the do, we will empty the password field for security purpose
  console.log(doc, 'post hook: Data after saving');
  next();
});

// Query middleware -----------------------------------------------------------------------------------
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }); // this will filter out the deleted documents
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// For custom instance method ----------------------------------------
// studentSchema.methods.isUserExists = async function (email: string) {
//   const existingUser = await StudentModel.findOne({ email });
//   return existingUser;
// };
// 3. Create a Model.

// for static instance method ----------------------------------------
studentSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await StudentModel.findOne({ email });
  return existingUser;
};
export const StudentModel = model<TStudent, IStudentModal>(
  'Student',
  studentSchema,
);
