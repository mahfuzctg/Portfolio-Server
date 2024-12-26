import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";

import httpStatus from "http-status";

const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { token, user } = result;

  res.json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: user,
    token,
  });
});

export const authControllers = {
  createUser,
  loginUser,
};
