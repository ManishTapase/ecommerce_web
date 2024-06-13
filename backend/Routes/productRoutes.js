import express from "express";
import formidable from "express-formidable";
import { isAdmin, requiredSignIn } from "../MiddleWare/authMiddleWare.js";
import {
  ProductByMainCategory,
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteOrderController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  orderController,
  productCategoryController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
  updateStatusController,
} from "../Controller/productController.js";
const router = express.Router();
router.post(
  "/create-product",
  requiredSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/single-product/:slug", getSingleProductController);
router.get("/all-products", getAllProductController);
router.get("/get-product-photo/:pid", productPhotoController);
router.put(
  "/update-product/:pid",
  requiredSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.delete("/delete-product/:pid",requiredSignIn,isAdmin,deleteProductController);
router.delete("/delete-order/:pid",requiredSignIn,deleteOrderController);
router.get("/category-filter/:slug",productCategoryController);
router.post("/filter-products",productFiltersController);
router.post("/filter-By-mainCat-products",ProductByMainCategory);
router.get("/all-orders",requiredSignIn,orderController)
router.put("/update-status/:oid",requiredSignIn,isAdmin,updateStatusController)
router.get("/product-list/:page", productListController);
router.get("/braintree/token", braintreeTokenController);
router.post("/braintree/payment", requiredSignIn, brainTreePaymentController);
//search product
router.get("/search/:keyword", searchProductController);
// similar product
router.get("/related-product/:pid/:cid", relatedProductController);

export default router;
