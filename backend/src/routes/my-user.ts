import { Router } from "express";
import {
  validateCreateCurrentUser,
  validateUpdateCurrentUser,
} from "../validation/my-user";
import {
  createCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/my-user";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const router = Router();

router.get("/", jwtCheck, jwtParse, getCurrentUser);

router.post("/", jwtCheck, validateCreateCurrentUser, createCurrentUser);

router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateUpdateCurrentUser,
  updateCurrentUser
);

export default router;
