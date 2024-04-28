import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createCheckoutSession } from "../controllers/orders";

const router = Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckoutSession
);

export default router;
