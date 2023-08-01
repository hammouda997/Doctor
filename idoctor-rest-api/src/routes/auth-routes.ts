import {Router} from "express";
import authController from "../controllers/auth-controller";
import * as tokenController from "../controllers/token-controller";
import {check} from "express-validator";
import {findByRefreshToken} from "controllers/findByRefreshToken";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("is an invalid email format")
      .normalizeEmail(),
    check("password").not().isEmpty().withMessage("must not be empty"),
  ],
  authController.signup
);

authRoutes.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("is an invalid email format")
      .normalizeEmail(),
    check("password").not().isEmpty().withMessage("must not be empty"),
  ],
  authController.login
);
authRoutes.get(`/by-token`, tokenController.fetchByToken);

authRoutes.get(`/verify-token`, tokenController.verifyUserToken);

authRoutes.get(
  `/refresh-token`,
  findByRefreshToken,
  tokenController.refreshToken
);

export default authRoutes;
