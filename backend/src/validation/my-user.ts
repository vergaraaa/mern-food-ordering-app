import { body } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

export const validateCreateCurrentUser = [
  body("auth0Id").notEmpty().withMessage("Auth0Id is required"),
  body("email").isEmail().withMessage("Email is required"),
  validateFields,
];
