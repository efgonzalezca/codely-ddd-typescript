import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import { Controller } from '../../types';
import { UserCreator } from '../../../Users/application/UserCreator';

type CoursePutRequest = Request & {
  body: {
    id: string,
    names: string,
    surnames: string,
    document: string
  };
};

export class UserPutController implements Controller {
  constructor(private userCreator: UserCreator) {
    this.userCreator = userCreator;
  }

  async run(req: CoursePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, names, surnames, document } = req.body;
      await this.userCreator.run({ id, names, surnames, document });
      res.status(httpStatus.CREATED).send();
    } catch(err) {
      next(err)
    }
  }
}