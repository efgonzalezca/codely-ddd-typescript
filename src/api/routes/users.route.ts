import { body } from 'express-validator';
import { NextFunction, Request, Response,  Router } from 'express';

import { validatorHandler } from '../middlewares';
import container from '../dependency-injection/index';
import { UserPutController } from '../controllers/users';

export const register = (router: Router) => {
  const reqSchema = [
    body('id').exists().isString(),
    body('names').exists().isString(),
    body('surnames').exists().isString(),
    body('document').exists().isString()
  ]
  const controller: UserPutController = container.get('api.controllers.users.UserPutController');
  router.put(
    '/users/:id',
    reqSchema,
    validatorHandler,
    (req: Request, res: Response, next: NextFunction) => controller.run(req, res, next)
  );
}