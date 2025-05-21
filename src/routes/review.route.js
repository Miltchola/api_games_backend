import express from 'express';
import reviewController from '../controller/review.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();

router.get('/game/:gameId', reviewController.getReviewsForGame);
router.get('/user/:userId', reviewController.getReviewsForUser);
router.post('/', verifyToken, reviewController.createReview);
router.post('/import-all', reviewController.importAllReviews);

export default router;