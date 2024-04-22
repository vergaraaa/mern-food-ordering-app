import { Router } from "express";
import { createCurrentUser } from "../controllers/my-user";
import { validateCreateCurrentUser } from "../validation/my-user";
import { jwtCheck } from "../middlewares/auth";

const router = Router();

router.post("/", jwtCheck, validateCreateCurrentUser, createCurrentUser);

export default router;
