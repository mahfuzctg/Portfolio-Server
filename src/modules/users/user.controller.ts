import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDB(
    req.query?.role as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await userServices.getSingleUserFromDB(req.params.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await userServices.updateUserIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const followUser = catchAsync(async (req, res) => {
  const result = await userServices.followUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "You followed the user",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await userServices.deleteUserFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const userControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  followUser,
};
