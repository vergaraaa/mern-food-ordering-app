import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import {
  validateCreateCurrentUser,
  validateUpdateCurrentUser,
} from "../validation/my-user";
import { createCurrentUser, updateCurrentUser } from "../controllers/my-user";

const router = Router();

router.post("/", jwtCheck, validateCreateCurrentUser, createCurrentUser);

router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateUpdateCurrentUser,
  updateCurrentUser
);

export default router;
