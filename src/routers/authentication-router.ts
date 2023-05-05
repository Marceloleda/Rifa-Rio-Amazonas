import { postSignIn } from "@/controllers";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post('/sign-in',  postSignIn)

export { authenticationRouter}

// validateBody(signInSchema)