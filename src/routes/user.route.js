import express from 'express';
import userController from '../controller/user.controller.js';

const router = express.Router();
// POST
// Rota de REGISTER
router.post('/register', userController.register); 
// Rota de LOGIN
router.post('/login', userController.login);

export default router;