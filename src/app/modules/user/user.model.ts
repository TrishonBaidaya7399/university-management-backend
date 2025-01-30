import { model, Schema } from 'mongoose';
import { TUser } from './user.inteface';

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password should be at least 8 characters'],
      maxlength: [20, 'Password should not be more than 20 characters'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      default: 'student',
      required: [
        true,
        'Please define a role from these: Admin, Student or Faculty',
      ],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
      required: [true, 'Please define the status'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export const User = model<TUser>('User', UserSchema);
