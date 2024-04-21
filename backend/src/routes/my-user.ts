import { Router } from "express";
import { createCurrentUser } from "../controllers/my-user";

const router = Router();

router.post("/", createCurrentUser);

export default router;
