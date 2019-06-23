import { Router } from 'express';
import validator from './validator';
import action from './action';

// Experss app router
const path = '/search';
const router = Router();

router.route(path).get(validator.index, action.index);

export default router;
