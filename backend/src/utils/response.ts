import { Response } from 'express';

interface SuccessResponse {
  success: true;
  message: string;
  data?: any;
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: any;
}

export const sendSuccess = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
): Response => {
  const response: SuccessResponse = {
    success: true,
    message,
    ...(data && { data }),
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: any
): Response => {
  const response: ErrorResponse = {
    success: false,
    message,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(response);
};
