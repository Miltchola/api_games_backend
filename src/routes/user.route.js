import express from 'express';
import userController from '../controller/user.controller.js';

const router = express.Router();
// POST
// Rota de REGISTER
router.post('/register', userController.register); 
// Rota de LOGIN
router.post('/login', userController.login);

// Buscar usuário por username OU email
router.get('/users/:identifier', userController.getUserByIdentifier);

export default router;