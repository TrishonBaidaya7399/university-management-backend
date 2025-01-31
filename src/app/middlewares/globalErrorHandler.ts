/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong!';
  return res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};
export default globalErrorHandler;
