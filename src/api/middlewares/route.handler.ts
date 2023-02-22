import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';

export const routeHandler = (req: Request, res: Response, _next: NextFunction) => {
  res
    .status(httpStatus.NOT_IMPLEMENTED)
    .json({error: {
      code: 40400,
      message: `The requested URL ${ req.originalUrl } was not found on the server`
    }})
}