import {Response, Request, NextFunction} from "express";
import UserModel from "../models/UserModel";
import {ISerializedToken} from "./Auth";
import verifyToken from "utils/verifyToken";
export const checkTokenPresence = (req: Request) => {
  const header = req.headers.authorization;

  if (!header) throw Error("No token");
  const bearer = header.split(" ");

  return bearer[1];
};

const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = checkTokenPresence(req);
    const decodedToken = verifyToken(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY || ""
    ) as ISerializedToken;
    const user = await UserModel.findById(decodedToken.id, {
      password: false,
      emailActivationToken: false,
    });

    if (!user) {
      res.status(404).send("User not found");

      return;
    }
    res.locals.currentUser = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      res.status(403).send("Token expired");
    else {
      res.status(400).send(error.message);
    }
  }
};

export default currentUser;
