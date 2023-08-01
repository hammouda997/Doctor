import {Router} from "express";
import userController from "../controllers/user-controller";
import {check} from "express-validator";

const userRoutes = Router();

userRoutes.patch(
  "/",
  check("id").not().isEmpty().withMessage("must not be empty"),
  userController.updateUser
);

userRoutes.get("/team", userController.getTeam);
userRoutes.get("/all", userController.getAllUsers);
userRoutes.delete("/", userController.deleteUser);
userRoutes.patch(
  "/password",
  [
    check("id").not().isEmpty().withMessage("must not be empty"),
    check("currentPassword").not().isEmpty().withMessage("must not be empty"),
    check("newPassword").not().isEmpty().withMessage("must not be empty"),
  ],
  userController.updatePassword
);

export default userRoutes;
