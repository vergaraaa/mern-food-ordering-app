import { Router } from "express";
import { param } from "express-validator";
import {
  getRestaurantById,
  searchRestaurant,
} from "../controllers/restaurants";

const router = Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant id parameter must be a valid string"),
  getRestaurantById
);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchRestaurant
);

export default router;
