import { Router } from 'express';

export interface Controller {
  router: Router;

  initialRoutes: () => void;
}
