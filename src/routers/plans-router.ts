import { Router } from "express";
import { authenticateToken } from '@/middlewares';
import { basicPlan, masterRafflePlan, premiumPlan } from "@/controllers";


const plansRouter = Router();

plansRouter.all('/*', authenticateToken)
.post('/basic', basicPlan)

plansRouter.all('/*', authenticateToken)
.post('/premium', premiumPlan)

plansRouter.all('/*', authenticateToken)
.post('/master', masterRafflePlan)


export { plansRouter}
