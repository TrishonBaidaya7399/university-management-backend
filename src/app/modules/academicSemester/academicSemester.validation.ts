import { z } from 'zod';
import {
  AcademicCodeConstants,
  AcademicMonthsConstants,
  AcademicNameConstants,
} from './academicSemester.constants';

export const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicNameConstants] as [string, ...string[]], {
      errorMap: () => ({ message: 'Academic Semester name is required' }),
    }),
    code: z.enum([...AcademicCodeConstants] as [string, ...string[]], {
      errorMap: () => ({ message: 'Academic semester code is required' }),
    }),
    year: z.date({ required_error: 'Year is required' }),
    startMonth: z.enum([...AcademicMonthsConstants] as [string, ...string[]], {
      errorMap: () => ({ message: 'StartMonth is required' }),
    }),
    endMonth: z.enum([...AcademicMonthsConstants] as [string, ...string[]], {
      errorMap: () => ({ message: 'EndMonth is required' }),
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidation,
};
