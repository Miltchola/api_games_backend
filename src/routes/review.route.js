import express from 'express';
import reviewController from '../controller/review.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Gerenciamento de avaliações de jogos
 */

/**
 * @swagger
 * /reviews/game/{gameId}:
 *   get:
 *     summary: Lista todas as avaliações de um jogo
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do jogo
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/game/:gameId', reviewController.getReviewsForGame);

/**
 * @swagger
 * /reviews/user/{userId}:
 *   get:
 *     summary: Lista todas as avaliações de um usuário
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de avaliações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/user/:userId', reviewController.getReviewsForUser);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               gameId: "abc123"
 *               rating: 4.5
 *               text: "Muito bom!"
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
router.post('/', verifyToken, reviewController.createReview);

/**
 * @swagger
 * /reviews/import-all:
 *   post:
 *     summary: Importa todas as avaliações
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Avaliações importadas com sucesso
 */
router.post('/import-all', reviewController.importAllReviews);

/**
 * @swagger
 * /reviews/game/rawg/{rawgId}:
 *   get:
 *     summary: Lista todas as avaliações de um jogo pelo rawgId
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: rawgId
 *         required: true
 *         schema:
 *           type: string
 *         description: RAWG ID do jogo
 *     responses:
 *       200:
 *         description: Lista de avaliações
 */
router.get('/game/rawg/:rawgId', reviewController.getReviewsForGameByRawgId);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Deleta uma review (apenas o autor pode deletar)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da review
 *     responses:
 *       200:
 *         description: Review deletada com sucesso
 *       403:
 *         description: Não autorizado
 *       404:
 *         description: Review não encontrada
 */
router.delete('/:reviewId', verifyToken, reviewController.deleteReview);

export default router;
