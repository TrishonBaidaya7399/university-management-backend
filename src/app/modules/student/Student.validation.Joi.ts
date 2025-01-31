import Joi from 'joi';

// 1. Define reusable validation components
const nameValidationSchema = Joi.string()
  .trim()
  .min(3)
  .max(20)
  .regex(/^[A-Z][a-zA-Z]*$/, 'capitalize format')
  .messages({
    'string.min': 'Name should be minimum 3 characters',
    'string.max': 'Name should be maximum 20 characters',
    'string.pattern.name':
      '{#label} must start with a capital letter and contain only alphabets',
    'string.empty': '{#label} is required',
  });

const contactNumberValidationSchema = Joi.string()
  .trim()
  .length(10)
  .regex(/^\d+$/, 'numeric')
  .messages({
    'string.length': 'Phone number should be exactly 10 digits',
    'string.pattern.name': '{#label} must be numeric',
    'string.empty': '{#label} is required',
  });

// 2. Define schemas for nested objects
const guardianValidationSchema = Joi.object({
  fatherName: nameValidationSchema.required().label('Father Name'),
  fatherOccupation: Joi.string().trim().required().label('Father Occupation'),
  fatherContactNo: contactNumberValidationSchema
    .required()
    .label('Father Contact No'),
  motherName: nameValidationSchema.required().label('Mother Name'),
  motherOccupation: Joi.string().trim().label('Mother Occupation'),
  motherContactNo: contactNumberValidationSchema.label('Mother Contact No'),
});

const localGuardianValidationSchema = Joi.object({
  name: nameValidationSchema.required().label('Local Guardian Name'),
  occupation: Joi.string().trim().required().label('Local Guardian Occupation'),
  contactNo: contactNumberValidationSchema
    .required()
    .label('Local Guardian Contact No'),
  address: Joi.string().trim().required().label('Local Guardian Address'),
  relation: Joi.string().trim().required().label('Relation'),
});

// 3. Define the main student schema
const studentValidationSchema = Joi.object({
  _id: Joi.string().required().label('ID'),
  id: Joi.string().trim().required().label('Student ID'),
  name: Joi.object({
    firstName: nameValidationSchema.required().label('First Name'),
    middleName: nameValidationSchema.optional().allow('').label('Middle Name'),
    lastName: nameValidationSchema.optional().allow('').label('Last Name'),
  })
    .required()
    .label('Name'),
  email: Joi.string().trim().email().required().label('Email'),
  contactNo: contactNumberValidationSchema.required().label('Contact No'),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': '{#label} must be one of the following: male, female, other',
    })
    .label('Gender'),
  bloodGroup: Joi.string()
    .valid(
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
    )
    .optional()
    .messages({
      'any.only':
        '{#label} must be one of the following: A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
    })
    .label('Blood Group'),
  dateOfBirth: Joi.string().trim().optional().label('Date of Birth'),
  profileImage: Joi.string().trim().optional().label('Profile Image'),
  permanentAddress: Joi.string().trim().optional().label('Permanent Address'),
  presentAddress: Joi.string().trim().optional().label('Present Address'),
  isActive: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .required()
    .messages({
      'any.only': '{#label} must be either active or inactive',
    })
    .label('Activity Status'),
  emergencyNo: contactNumberValidationSchema.optional().label('Emergency No'),
  guardian: guardianValidationSchema.required().label('Guardian'),
  localGuardian: localGuardianValidationSchema
    .optional()
    .label('Local Guardian'),
});

export default studentValidationSchema;
