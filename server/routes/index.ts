import { Router } from 'express';
import article from '../controllers/article/router';
import tag from '../controllers/tag/router';
import archive from '../controllers/archive/router';
import search from '../controllers/search/router';

// Use routes
const router = Router();
router.use(article);
router.use(tag);
router.use(archive);
router.use(search);

export default router;
