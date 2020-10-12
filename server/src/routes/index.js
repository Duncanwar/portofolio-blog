import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './auth.routes';
import articleRoutes from './article.routes';
import queriesRoutes from './queries.routes';
import userInfoRoutes from './user.routes';

dotenv.config();

const router = express.Router();
const apiVersion = process.env.API_VERSION;
const baseUrl = `/api/${apiVersion}`;

router.use(baseUrl, authRoutes);
router.use(baseUrl, articleRoutes);
router.use(baseUrl, queriesRoutes);
router.use(baseUrl, userInfoRoutes);

export default router;
