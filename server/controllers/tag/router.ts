import { Router } from 'express';
import validator from './validator';
import action from './action';

// Experss app router
const path = '/tags';
const router = Router();

router.route(path).get(action.index);
router.route(`${path}/:id`).get(validator.params, action.show);

export default router;
