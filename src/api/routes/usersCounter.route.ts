import { NextFunction, Request, Response, Router } from 'express';

import container from '../dependency-injection';

export const register = (router: Router) => {
  const usersCounterGetController = container.get('api.controllers.usersCounter.UsersCounterGetController');
  router.get('/usersCounter', (req: Request, res: Response, next: NextFunction) => usersCounterGetController.run(req, res, next));

};
