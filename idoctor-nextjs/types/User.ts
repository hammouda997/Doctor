export interface IUser {
  _id: string;
  username?: string;
  fullName: string;
  role: string;
  email: string;
  password: string;
  loginAt: Date;
  isDeactivated: boolean;
  createdAt: Date;
  updatedAt: Date;
  accessToken?: string;
}
