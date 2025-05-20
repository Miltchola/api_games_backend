import express from 'express';
import wishlistController from '../controller/wishlist.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js';

const router = express.Router();
router.use(verifyToken);

router.get('/', wishlistController.getWishlist);
router.post('/add', wishlistController.addGame);
router.post('/remove', wishlistController.removeGame);

export default router;