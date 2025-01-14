import { z } from 'zod';
// name validation
const nameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
      invalid_type_error: 'First Name must be a string',
    })
    .max(20, "First Name can't be more than 20 characters")
    .min(3, "First Name can't be less than 3 characters"),
  middleName: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 2 || val.length <= 20,
      "middleName shouldn't be greater than 2 or less than 20 characters if yu want to provided",
    ),
  lastName: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 2 || val.length <= 20,
      "middleName shouldn't be greater than 2 or less than 20 characters if yu want to provided",
    ),
});
// email validation
export const emailValidationSchema = z
  .string({
    required_error: 'Email is required',
  })
  .email('Invalid email format');
//   phone validation
export const phoneNumberValidationSchema = z
  .string({
    required_error: 'Contact Number is required',
  })
  .regex(/^\d{10}$/, 'Contact Number must be exactly 10 digits');
//   guardian validation
const guardianValidationSchema = z.object({
  fatherName: z
    .string({
      required_error: 'Father Name is required',
    })
    .max(20, "Father Name can't be more than 20 characters")
    .min(3, "Father Name can't be less than 3 characters"),
  fatherOccupation: z.string({
    required_error: 'Father Occupation is required',
  }),
  fatherContactNo: z
    .string({
      required_error: 'Father Contact Number is required',
    })
    .regex(/^\d{10}$/, 'Father Contact Number must be exactly 10 digits'),
  motherName: z
    .string({
      required_error: 'Mother Name is required',
    })
    .max(20, "Mother Name can't be more than 20 characters")
    .min(3, "Mother Name can't be less than 3 characters"),
  motherOccupation: z.string().optional(),
  motherContactNo: z
    .string()
    .regex(/^\d{10}$/, 'Mother Contact Number must be exactly 10 digits')
    .optional(),
});
// local guardian validation
const localGuardianValidationSchema = z
  .object({
    name: z
      .string({
        required_error: 'Local Guardian Name is required',
      })
      .max(20, "Local Guardian Name can't be more than 20 characters")
      .min(3, "Local Guardian Name can't be less than 3 characters"),
    occupation: z.string({
      required_error: 'Local Guardian Occupation is required',
    }),
    contactNo: z
      .string({
        required_error: 'Local Guardian Contact Number is required',
      })
      .regex(
        /^\d{10}$/,
        'Local Guardian Contact Number must be exactly 10 digits',
      ),
    address: z.string({
      required_error: 'Local Guardian Address is required',
    }),
    relation: z.string({
      required_error: 'Relation with Local Guardian is required',
    }),
  })
  .optional();
// student validation
const studentValidationSchema = z.object({
  _id: z
    .string({
      required_error: '_id is required',
    })
    .min(10, '_id must be at least 10 characters'),

  id: z
    .string({
      required_error: 'id is required',
    })
    .min(1, 'id must not be empty'),

  name: nameValidationSchema,

  email: emailValidationSchema,

  contactNo: phoneNumberValidationSchema,

  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
  }),

  bloodGroup: z
    .enum([
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
    ])
    .optional(),

  dateOfBirth: z.string().optional(),

  profileImage: z.string().url('Profile Image must be a valid URL').optional(),

  permanentAddress: z.string().optional(),

  presentAddress: z.string().optional(),

  isActive: z
    .enum(['active', 'inactive'], {
      required_error: 'Activity Status is required',
    })
    .default('active'),

  emergencyNo: z
    .string()
    .regex(/^\d{10}$/, 'Emergency Contact Number must be exactly 10 digits')
    .optional(),

  guardian: guardianValidationSchema,

  localGuardian: localGuardianValidationSchema,
});

export default studentValidationSchema;
