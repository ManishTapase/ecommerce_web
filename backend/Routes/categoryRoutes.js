import express from "express";
import { isAdmin, requiredSignIn } from "../MiddleWare/authMiddleWare.js";
import {
  AllCategoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../Controller/categoryController.js";
const router = express.Router();
router.post(
  "/create-Category",
  requiredSignIn,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requiredSignIn,
  isAdmin,
  updateCategoryController
);
router.get("/allcategory", AllCategoryController);
router.get("/single-category/:slug", singleCategoryController);
router.delete(
  "/delete-category/:id",
  requiredSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
