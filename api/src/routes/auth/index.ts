import { Router } from "express";
import { validateData } from "@middlewares/validationMiddleware.js";
import { loginUserSchema, registerUserSchema } from "@schemas/authSchemas.js";
import { getUser, login, register } from "./auth.controller.js";
import { verifyToken } from "@middlewares/verifyToken.js";

const router: Router = Router();

router.post("/register", validateData(registerUserSchema), register);
router.post("/login", validateData(loginUserSchema), login);
router.get("/me", verifyToken, getUser);

export default router;
