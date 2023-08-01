import {Response, Request, NextFunction} from "express";
import UserModel from "models/UserModel";
import {checkTokenPresence} from "./token-controller";

export const findByRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decodedToken = checkTokenPresence(
      req,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    const user = await UserModel.findById(decodedToken.id);

    if (!user) {
      res.status(404).send("Problem while finding user");

      return;
    }
    const userSessionIndex = user.sessions.findIndex(
      (el) => el.identifier === decodedToken.sessionId
    );
    const token = getTokenFromHeader(req);

    if (user.sessions[userSessionIndex].refreshToken !== token) {
      res.status(403).send("Session revoked");

      return;
    }
    res.locals.currentUser = user;
    res.locals.currentSession = decodedToken.sessionId;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getTokenFromHeader = (req: Request) => {
  const header = req.headers.authorization;

  if (!header) throw Error("No token");
  const bearer = header.split(" ");

  return bearer[1];
};
