import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  let message: string = "";
  let statusCode: number = 0;
  let success: boolean;

  // if the data is not found or exist ?
  if (Array.isArray(data?.data) && !data?.data.length) {
    (message = "No data found"), (statusCode = 404);
    success = false;
  } else if (typeof data.data === "object" && !Object.keys(data.data!).length) {
    (message = "No data found"), (statusCode = 404);
    success = false;
  } else if (!data?.data) {
    (message = "No data found"), (statusCode = 404);
    success = false;
  } else {
    message = data?.message as string;
    statusCode = data?.statusCode;
    success = data?.success;
  }

  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data: data.data,
  });
};

export default sendResponse;
