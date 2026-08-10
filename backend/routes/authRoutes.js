import express from "express";
import { loginSchema, signUpSchema } from "../validations/validator.js";
import { validateBody } from "../middleware/validate.js";
import { login, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signUpSchema), signup);
authRouter.post("/login", validateBody(loginSchema),login)

export default authRouter;
