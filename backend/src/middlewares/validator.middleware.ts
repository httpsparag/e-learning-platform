import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendError } from '../utils/response';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return sendError(res, 400, 'Validation failed', errorMessages);
  }
  
  next();
};
