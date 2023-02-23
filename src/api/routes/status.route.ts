import { Router, Request, Response, NextFunction } from 'express';
import container from '../dependency-injection';
import StatusController from '../controllers/StatusGetController';

export const register = (router: Router) => {
  const controller: StatusController = container.get('api.controllers.StatusGetController');
  router.get('/status', (req: Request, res: Response, next: NextFunction) => controller.run(req, res, next));
};
