import { Response, Request } from "express";
import { Secret, sign } from "jsonwebtoken";
import { User } from "../entity/User";

export const createToken = (
  type: "accessToken" | "refreshToken",
  user: User
) =>
  sign(
    {
      user_id: user.user_id,
      ...(type === "refreshToken" ? { tokenVersion: user.tokenVersion } : {}),
    },
    type === "accessToken"
      ? (process.env.ACCESS_TOKEN_SECRET as Secret)
      : (process.env.REFRESH_TOKEN_SECRET as Secret),
    {
      expiresIn: type === "accessToken" ? "360d" : "360d",
    }
  );

export const sendRefreshToken = (res: Response, user: User) => {
  console.log("sendRefreshToken");

  res.cookie(
    process.env.REFRESH_TOKEN_COOKIE_NAME as string,
    createToken("refreshToken", user),
    {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/refresh_token",
      expires: new Date(Date.now() + 1440 * 60 * 1000),
    }
  );
};
