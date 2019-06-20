import { Router } from 'express';
import validator from './validator';
import action from './action';

// Experss app router
const path = '/articles';
const router = Router();

router.route(path).get(validator.index, action.index);
router.route(`${path}/:id`).get(validator.show, action.show);

export default router;
