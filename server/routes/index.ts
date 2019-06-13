import { Router } from 'express';
import article from '../controllers/article/router';
import tag from '../controllers/tag/router';
import archive from '../controllers/archive/router';

// Experss app router
const router = Router();

export default [router, article, tag, archive];
