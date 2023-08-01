import {Document, Schema, model} from "mongoose";
export type UserSession = {
  identifier: string;
  refreshToken: string;
  notificationToken?: string;
  socketId?: string;
};

export interface IUser extends Document {
  _id: string;
  username?: string;
  email: string;
  fullName: string;
  password: string;
  loginAt: Date;
  isDeactivated: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  sessions: UserSession[];
  accessToken: string;
  isDeleted: boolean;
}
const userSession = new Schema(
  {
    identifier: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {_id: false}
);

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    loginAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "user",
    },
    accessToken: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // TODO: Add sessions to user model and use it to logout from all devices at once
    sessions: [userSession],
  },
  {timestamps: true}
);
userSchema.set("toJSON", {
  // @ts-ignore
  transform: (user: IUser, {__v, password, ...rest}: IUser) => rest,
});
const UserModel = model<IUser>("User", userSchema);

export default UserModel;
