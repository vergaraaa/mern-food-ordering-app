import { Router } from "express";
import { param } from "express-validator";
import { searchRestaurant } from "../controllers/restaurants";

const router = Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchRestaurant
);

export default router;
