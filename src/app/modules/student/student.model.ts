import { Schema, model } from 'mongoose';
import {
  IStudentModal,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.iterface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    minlength: [3, 'First name should be minimum 3 characters'],
    maxlength: [20, 'First name should be maximum 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
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
  },
  occupation: {
    type: String,
    trim: true,
  },
  contactNo: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  relation: {
    type: String,
    trim: true,
  },
});
const studentSchema = new Schema<TStudent, IStudentModal>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
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
    },

    contactNo: {
      type: String,
      trim: true,
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

// for static instance method ----------------------------------------
studentSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await StudentModel.findOne({ email });
  return existingUser;
};
export const StudentModel = model<TStudent, IStudentModal>(
  'Student',
  studentSchema,
);
