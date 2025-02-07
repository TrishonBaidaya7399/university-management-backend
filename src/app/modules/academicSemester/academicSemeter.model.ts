import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicCodeConstants,
  AcademicMonthsConstants,
  AcademicNameConstants,
} from './academicSemester.constants';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: [...AcademicNameConstants], required: true },
  code: { type: String, enum: [...AcademicCodeConstants], required: true },
  year: { type: Date, required: true },
  startMonth: {
    type: String,
    enum: [...AcademicMonthsConstants],
    required: true,
  },
  endMonth: {
    type: String,
    enum: [...AcademicMonthsConstants],
    required: true,
  },
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
