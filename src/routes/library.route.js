import express from 'express';
import libraryController from '../controller/library.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();
router.use(verifyToken);

router.get('/', libraryController.getLibrary);
router.post('/add', libraryController.addGame);
router.post('/remove', libraryController.removeGame);

export default router;