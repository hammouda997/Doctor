import {Response, Request, RequestHandler} from "express";
import verifyToken from "utils/verifyToken";
import {ISerializedToken, IToken, UserUnionType} from "types/Auth";
import UserModel, {IUser} from "models/UserModel";
import * as TokenService from "./tokenService";
import {v4 as uuidv4} from "uuid";
import "dotenv/config";

export const checkTokenPresence = (req: Request, secretKey?: string) => {
  const header = req.headers.authorization;

  if (!header || header === "undefined") throw new Error("No token");
  const bearer = header.split(" ");

  if (bearer[1] === "null") throw new Error("No token");

  return verifyToken(bearer[1], secretKey || "") as ISerializedToken;
};

export const verifyUserToken: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.headers.authorization as IToken;
    const isValid =
      token && TokenService.isAccessTokenStillValid(token.accessToken || "");

    res.send({token: {isValid}});
  } catch (error) {
    res.status(500).send({message: error.message, stack: error.stack});
  }
};

export const refreshToken: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {currentUser, currentSession} = res.locals as {
    currentUser: IUser;
    currentSession: string;
  };

  try {
    const token = await TokenService.createAccessToken(
      currentUser.id,
      currentSession
    );

    res.send({accessToken: token});
  } catch (error) {
    res.status(500).send({message: error.message, stack: error.stack});
  }
};

// eslint-disable-next-line consistent-return
export const fetchByToken: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const decodedToken = checkTokenPresence(
      req,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const user = await fetchUserByToken(decodedToken);
    const userObject = await constructSignedInUserObject(user);
    res.send(userObject);
  } catch (error) {
    res.status(401).send({message: error.message, stack: error.stack});
  }
};
export const constructSignedInUserObject = async (user: IUser) => {
  const {refreshToken, sessionId} = await createRefreshToken(user);
  const accessToken = TokenService.createAccessToken(user.id, sessionId);

  return {user, refreshToken, accessToken};
};
export const createRefreshToken = async (user: IUser) => {
  const sessionId = uuidv4();

  const refreshToken = TokenService.createRefreshToken(user.id, sessionId);

  user.sessions.push({refreshToken, identifier: sessionId});

  await user.save();

  return {refreshToken, sessionId};
};

export const fetchUserByToken = async (decodedToken: ISerializedToken) => {
  let user: UserUnionType = await UserModel.findById(decodedToken.id, {
    password: false,
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
