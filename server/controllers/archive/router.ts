import { Router } from 'express';
import action from './action';

// Experss app router
const path = '/archives';
const router = Router();

router.route(path).get(action.index);

export default router;
