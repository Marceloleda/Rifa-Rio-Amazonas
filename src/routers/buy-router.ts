import { Router } from "express";
import { authenticateToken } from '@/middlewares';
import { buyTicket } from "@/controllers/buyer -controller";


const buyRouter = Router();

buyRouter
.post('/buy', authenticateToken, buyTicket)



export { buyRouter}
