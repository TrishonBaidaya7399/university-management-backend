import { z } from 'zod';

export const UserValidation = z.object({
  id: z.string().nonempty('ID is required'),
  password: z
    .string({
      invalid_type_error:
        'Password must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character',
    )
    .min(8, 'Password should be at least 8 characters')
    .max(20, 'Password should not be more than 20 characters')
    .optional(),
  needsPasswordChange: z.boolean().default(true).optional(),
  role: z.enum(['admin', 'student', 'faculty'], {
    errorMap: () => ({
      message: 'Role must be one of: admin, student, faculty',
    }),
  }),
  status: z.enum(['in-progress', 'blocked'], {
    errorMap: () => ({
      message: 'Status must be either in-progress or blocked',
    }),
  }),
  isDeleted: z.boolean().default(false).optional(),
  // createdAt: z.date().optional(),
  // updatedAt: z.date().optional(),
});

export const UserValidationSchema = {
  UserValidation,
};
