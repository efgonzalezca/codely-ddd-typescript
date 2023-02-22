import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';

export const errorHandler = (_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({error: {
      code: 50000,
      message: 'Internal server error'
    }})
}