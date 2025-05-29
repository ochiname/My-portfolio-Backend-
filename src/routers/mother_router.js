import express from 'express';
import authrouter from '../modules/auth/index.js';


const router = express.Router();

// Register routes
router.use('/user', authrouter);
export default router;
