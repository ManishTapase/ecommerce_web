import express from "express";
import {
  forgotePasswordController,
  getAllUsersController,
  loginController,
  registerController,
  updateProfileController,
} from "../Controller/authController.js";
import { isAdmin, requiredSignIn } from "../MiddleWare/authMiddleWare.js";
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-Password", forgotePasswordController);
router.put("/update-User-Profile", requiredSignIn, updateProfileController);
router.get("/all-users", requiredSignIn, isAdmin, getAllUsersController);
router.get("/admin-auth", requiredSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
    message: "admin",
  });
});
router.get("/user-auth", requiredSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
    message: "user",
  });
});
export default router;
