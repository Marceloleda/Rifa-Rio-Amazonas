import { getAllPlans } from "@/controllers";
import { Router } from "express";

const allPlansRouter = Router();

allPlansRouter.get('/all', getAllPlans)

export {allPlansRouter}