import { Router } from "express";
import { authenticateToken } from '@/middlewares';
import { basicPlan, premiumPlan } from "@/controllers";


const plansRouter = Router();

plansRouter.all('/*', authenticateToken)
.post('/basic', basicPlan)

plansRouter.all('/*', authenticateToken)
.post('/premium', premiumPlan)


export { plansRouter}
