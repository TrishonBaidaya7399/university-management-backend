import { NextFunction, Request, RequestHandler, Response } from 'express';

// create a higher order function for handling the asynchronous function handling
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
export default catchAsync;
