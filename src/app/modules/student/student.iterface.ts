import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type TGuardian = {
  fatherName?: string;
  fatherOccupation?: string;
  fatherContactNo?: string;
  motherName?: string;
  motherOccupation?: string;
  motherContactNo?: string;
};
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  relation: string;
};
export type TStudent = {
  _id: string;
  name: TUserName;
  email: string;
  gender?: 'male' | 'female' | 'other';
  bloodGroup?:
    | 'A'
    | 'A+'
    | 'A-'
    | 'B'
    | 'B+'
    | 'B-'
    | 'AB'
    | 'AB+'
    | 'AB-'
    | 'O'
    | 'O+'
    | 'O-';
  profileImage?: string;
  contactNo: string;
  isActive: 'active' | 'inactive';
  emergencyNo?: string;
  dateOfBirth?: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
};
