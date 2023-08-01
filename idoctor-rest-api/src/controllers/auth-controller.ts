import UserModel from "models/UserModel";
import {RequestHandler} from "express";
import bcrypt from "bcryptjs";

import validationErrorHandler from "utils/validation-error-handler";
import {constructSignedInUserObject} from "./token-controller";

const signup: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const {email, password, role, fullName} = req.body;
  try {
    const existingUser = await UserModel.findOne({email});

    if (existingUser !== null) {
      return res.status(422).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      role,
      fullName,
    });
    const userObject = await constructSignedInUserObject(newUser);
    return res.status(200).json(userObject);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const login: RequestHandler = async (req, res, next) => {
  const validationError = validationErrorHandler(req, res);

  if (validationError) {
    return validationError;
  }

  const {email, password} = req.body;

  try {
    const user = await UserModel.findOne({email});

    if (user === null) {
      return res.status(401).json({message: "Incorrect email"});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({message: "Incorrect email or password"});
    }

    user.loginAt = new Date(Date.now());
    await user.save();

    const userObject = await constructSignedInUserObject(user);
    return res.status(200).json(userObject);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const authController = {
  signup,
  login,
};

export default authController;
