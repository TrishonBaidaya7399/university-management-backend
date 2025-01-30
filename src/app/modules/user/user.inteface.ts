import { Model } from 'mongoose';

export type TUser = {
  id: string;
  password?: string;
  needsPasswordChange?: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted?: boolean;
};
export interface IUserModel extends Model<TUser> {
  myStaticMethod(): number;
}
