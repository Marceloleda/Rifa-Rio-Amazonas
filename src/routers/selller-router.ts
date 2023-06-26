import { Router } from "express";
import { authenticateToken } from '@/middlewares';
import { searchSellerData } from "@/controllers";


const selllerRouter = Router();

selllerRouter.all('/*', authenticateToken)
.get('/search', searchSellerData)




export { selllerRouter}