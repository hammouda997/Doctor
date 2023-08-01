import UserModel from "../models/UserModel";

export const seedUsers = async () => {
  const findAdmins = await UserModel.find({role: "ADMIN"});
  if (findAdmins.length > 0) {
    return;
  }
  await UserModel.create({
    email: "test@domain.com",
    password: "1234567",
    role: "ADMIN",
    fullName: "Test Admin",
  });
};
