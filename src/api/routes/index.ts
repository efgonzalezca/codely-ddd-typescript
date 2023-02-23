import { sync } from 'glob';
import { Router } from 'express';

const pathByOs = (osReference: string) => osReference === 'win32'
  ? `${ __dirname }/**/*.route.*`.replace(/\\/g, '/')
  : `${ __dirname }/**/*.route.*`

export const registerRoutes = (router: Router) => {
  const routes = sync(pathByOs(process.platform));
  routes.map(route => register(route, router));
}

const register = (routePath: string, router: Router) => {
  const route = require(routePath);
  route.register(router);
}