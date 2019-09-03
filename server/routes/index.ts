import { Router } from 'express';
import env from '../utils/envalid';
import article from '../controllers/article/router';
import tag from '../controllers/tag/router';
import archive from '../controllers/archive/router';
import search from '../controllers/search/router';

// Get environment variables
const { API_PREFIX } = env;

// Use routes
const router = Router();
router.use(API_PREFIX, article);
router.use(API_PREFIX, tag);
router.use(API_PREFIX, archive);
router.use(API_PREFIX, search);

export default router;
