import { Router } from "express";
import { authenticateToken, validateBody } from '@/middlewares';
import { raffleSchema } from '@/schemas';
import { createRaffle, findRaffle} from "@/controllers";


const rafflesRouter = Router();

rafflesRouter
.post('/',
authenticateToken, 
validateBody(raffleSchema), 
authenticateToken, createRaffle)

rafflesRouter.get('/:id/:slug', findRaffle)

export { rafflesRouter}
validateBody(raffleSchema)
