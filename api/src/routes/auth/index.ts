import { Router } from "express";
import { validateData } from "@middlewares/validationMiddleware";
import { loginUserSchema, registerUserSchema } from "@schemas/authSchemas";
import { getUser, login, register } from "./auth.controller";
import { verifyToken } from "@middlewares/verifyToken";

const router: Router = Router();

router.post("/register", validateData(registerUserSchema), register);
router.post("/login", validateData(loginUserSchema), login);
router.get("/me", verifyToken, getUser);

export default router;
