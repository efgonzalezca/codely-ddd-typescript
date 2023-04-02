import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

import { Controller } from '../../types';
import { UsersCounterNotExist } from '../../../UsersCounter/domain/UsersCounterNotExist';
import { UsersCounterFinder } from '../../../UsersCounter/application/Find/UsersCounterFinder';

export class UsersCounterGetController implements Controller {
  private usersCounterFinder: UsersCounterFinder;

  constructor(usersCounterFinder: UsersCounterFinder) {
    this.usersCounterFinder = usersCounterFinder;
  }

  async run(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    try {
      const count = await this.usersCounterFinder.run();

      res.json({ total: count });
    } catch (e) {
      console.log(e)
      if (e instanceof UsersCounterNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      } else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
