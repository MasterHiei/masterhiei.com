import { Router } from 'express';
import validator from './validator';
import action from './action';

// Experss app router
const path = '/articles';
const router = Router();

router.route(path).get(validator.queries, action.index);
router.route(`${path}/:id`).get(validator.params, action.show);

export default router;
