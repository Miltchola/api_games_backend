import express from 'express';
import taskController from '../controller/task.controller.js';
import authMiddleware from '../middleware/jwt.token.middleware.js';
import { body, param } from 'express-validator';

const router = express.Router();

router.use(authMiddleware);

router.post(
    '/',
    [
      body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),
      body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters'),
      body('userId')
        .notEmpty().withMessage('User ID is required')
        .isMongoId().withMessage('Invalid User ID'),
    ],
    taskController.createTask
  );
  
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put(
    '/:id',
    [
      param('id').isMongoId().withMessage('Invalid Task ID'),
      body('title')
        .optional()
        .isString().withMessage('Title must be a string')
        .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),
      body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters'),
      body('completed')
        .optional()
        .isBoolean().withMessage('Completed must be a boolean'),
    ],
    taskController.updateTask
  );
  router.patch(
    '/:id',
    [
      param('id').isMongoId().withMessage('Invalid Task ID'),
      body('title')
        .optional()
        .isString().withMessage('Title must be a string')
        .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),
      body('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters'),
      body('completed')
        .optional()
        .isBoolean().withMessage('Completed must be a boolean'),
    ],
    taskController.updateTaskPartially
);
router.delete('/:id', taskController.deleteTask);

export default router;
