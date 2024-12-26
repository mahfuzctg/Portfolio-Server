import { generateToken } from "../../utils/jwt.util";
import { IUser } from "../users/user.interface";
import { UserModel } from "../users/user.model";

export const registerUser = async (userData: IUser) => {
  const existingUser = await UserModel.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const user = new UserModel(userData);
  await user.save();
  return user;
};

export const loginUser = async ({ email, password }: IUser) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ id: user._id });
  return token;
};
