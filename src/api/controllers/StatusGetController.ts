import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

import { Controller } from '../types';

export default class StatusGetController implements Controller {
  async run(_req: Request, res: Response, next: NextFunction) {
    try {
      res.status(httpStatus.OK).json({msg: 'ok'});
    } catch(err) {
      next(err)
    }
  }
}
