import { updatePlan, webhook } from "@/controllers";
import { Router } from "express";

const webhookRouter = Router();

webhookRouter.post('/webhook', webhook, updatePlan)

export {webhookRouter}

