import { NextFunction, Request, Response } from "express";

import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/users/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if the token is sent or not ?
    if (!token) {
      res.status(401).json({
        success: false,

        statusCode: httpStatus.FORBIDDEN,
        message: "you are not authorized",
      });
      return;
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token.split(" ")[1],
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { email, role } = decoded;

    //    check if the user is exist?
    const user = await User.findOne({ email, role });

    if (!user) {
      res.status(401).json({
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "you are not authorized",
      });
      return;
    }

    // check role
    if (!requiredRoles.includes(role)) {
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      });
      return;
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
