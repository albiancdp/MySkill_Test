import express from 'express';
// auth middleware
import authMiddleware from '../middleware/authMiddleware';
// import router
import defaultRouter from './default';
import authRouter from './auth';
import courseRouter from './course';
import healthCheckRouter from './health_check';

const router = express.Router();

router.use(defaultRouter);
router.use('/auth', authRouter);
router.use('/course', authMiddleware, courseRouter);
router.use(healthCheckRouter);

export default router;
