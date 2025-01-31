import { model, Schema } from 'mongoose';
import { IUserModel, TUser } from './user.inteface';
// import bcrypt from 'bcrypt';
import argon2 from 'argon2';
import config from '../../config';

const UserSchema = new Schema<TUser, IUserModel>(
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
// pre save middleware / hook : will work on create() | save() ----------------------------------------
UserSchema.pre('save', async function (next) {
  // this.password = await bcrypt.hash(
  this.password = await argon2.hash(
    (this?.password as string) || (config?.default_password as string),
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
UserSchema.post('save', function (doc, next) {
  doc.password = ''; // after saving the do, we will empty the password field for security purpose
  console.log(doc, 'post hook: Data after saving');
  next();
});
UserSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await UserModel.findOne({ id });
  return existingUser;
};
export const UserModel = model<TUser, IUserModel>('User', UserSchema);
