import httpStatus from "http-status";

import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";

import { TUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });

  if (payload?.password) {
    // check user existence
    if (user) {
      throw new AppError(httpStatus.FORBIDDEN, "already exist");
    }

    const userData = await User.create(payload);
    if (userData?.password) userData.password = "";
    return userData;
  } else {
    if (user) {
      // create a token for user
      const jwtPayload = {
        email: user.email,
        role: user.role,
        _id: user._id,
        memberShip: user?.memberShip,
      };
      const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires,
      });

      return { user, token };
    } else {
      const userData = await User.create(payload);
      // create a token for user
      const jwtPayload = {
        email: userData.email,
        role: userData.role,
        _id: userData._id,
        memberShip: userData?.memberShip,
      };
      const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires,
      });

      return { userData, token };
    }
  }
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  // check user existence
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "user not exist");
  }
  // check password if it exists
  if (user?.password) {
    if (user.password !== payload.password) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Password incorrect");
    }
  }

  // create a token for user
  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id,
    memberShip: user?.memberShip,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires,
  });

  user.password = "";
  return { user, token };
};

export const authServices = {
  createUserIntoDB,
  loginUser,
};
