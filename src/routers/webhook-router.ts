import { webhook } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const webhookRouter = Router();

webhookRouter.all('/*', authenticateToken).post('/webhook', webhook)

export {webhookRouter}

