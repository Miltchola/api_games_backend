import express from 'express';
import gameController from '../controller/game.controller.js';

const router = express.Router();

router.post('/', gameController.create);
router.get('/', gameController.getAll);

export default router;