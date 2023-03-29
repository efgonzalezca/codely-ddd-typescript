import { sync } from 'glob';
import { Router } from 'express';

const pathByOs = (osReference: string) => osReference === 'win32'
  ? `${ __dirname }/**/*.route.*[js|ts]`.replace(/\\/g, '/')
  : `${ __dirname }/**/*.route.*[js|ts]`

export const registerRoutes = (router: Router) => {
  const routes = sync(pathByOs(process.platform));
  routes.map(route => register(route, router));
}

const register = (routePath: string, router: Router) => {
  const route = require(routePath);
  route.register(router);
}