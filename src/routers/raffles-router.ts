import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';
import { raffleSchema } from '@/schemas';
import { createRaffle} from "@/controllers";


const rafflesRouter = Router();

rafflesRouter.all('/*', authenticateToken)
.post('/', validateBody(raffleSchema), createRaffle)

export { rafflesRouter}
validateBody(raffleSchema)
