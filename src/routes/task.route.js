import express from 'express';
import taskController from '../controller/task.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();
router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 */
router.post('/', taskController.create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas
 */
router.get('/', taskController.getAll);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa por ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 */
router.get('/:id', taskController.getById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada
 */
router.put('/:id', taskController.update);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada parcialmente
 */
router.patch('/:id', taskController.update);

/**
 * @swagger
 * /tasks/{id}/toggle:
 *   patch:
 *     summary: Alterna o status de conclusão da tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status da tarefa alternado
 */
router.patch('/:id/toggle', taskController.toggleCompletion);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarefa removida
 */
router.delete('/:id', taskController.remove);

export default router;
