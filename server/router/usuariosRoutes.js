import express from 'express';
import {
  registerUser,
  getUserProfile,
  login
} from '../src/controllers/authController.js';
import validateCredentials from '../middlewares/credentialMiddleware.js';
import validateAuth from '../middlewares/authMiddleware.js';
import requestLogger from '../middlewares/loggingMiddleware.js';

const router = express.Router();

router.use(requestLogger);

router.post('/register', registerUser);
router.post('/login', validateCredentials, login);
router.get('/profile', validateAuth, getUserProfile);

export default router;