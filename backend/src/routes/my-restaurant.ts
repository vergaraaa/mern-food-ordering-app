import multer from "multer";
import { Router } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { createMyRestaurant } from "../controllers/my-restaurant";
import { validateCreateMyRestaurant } from "../validation/my-restaurant";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  upload.single("imageFile"),
  validateCreateMyRestaurant,
  jwtCheck,
  jwtParse,
  createMyRestaurant
);

export default router;
