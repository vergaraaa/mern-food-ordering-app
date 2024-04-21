import { Router } from "express";
import { createCurrentUser } from "../controllers/my-user";
import { validateCreateCurrentUser } from "../validation/my-user";

const router = Router();

router.post("/", validateCreateCurrentUser, createCurrentUser);

export default router;
