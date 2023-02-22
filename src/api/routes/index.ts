import { sync } from 'glob';
import { Router } from 'express';

export const registerRoutes = (router: Router) => {
  const routes = sync(`${ __dirname }/**/*.route.*`);
  routes.map(route => register(route, router));
}

const register = (routePath: string, router: Router) => {
  const route = require(routePath);
  route.register(router);
}