import { body } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

export const validateCreateCurrentUser = [
  body("auth0Id").isString().notEmpty().withMessage("Auth0Id is required"),
  body("email").isEmail().withMessage("Email is required"),
  validateFields,
];

export const validateUpdateCurrentUser = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine 1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  validateFields,
];
