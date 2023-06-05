import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";

const signAccessToken = (user: Users) =>
  signToken(user, process.env.ACCESS_TOKEN_SECRET as string, "15m");

const signRefreshToken = (user: Users) =>
  signToken(user, process.env.REFRESH_TOKEN_SECRET as string, "1d");

const signToken = (user: Users, secret: string, expiresIn: string) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    secret,
    { expiresIn }
  );

  return token;
};

export { signAccessToken, signRefreshToken };
