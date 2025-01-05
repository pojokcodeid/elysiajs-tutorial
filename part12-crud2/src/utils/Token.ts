import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import UserModel from "../models/UserModel";

export const authMiddleware = (app: Elysia) => {
  return app
    .use(
      jwt({
        name: "jwt",
        secret: Bun.env.JWT_SECRET!,
      }),
    )
    .derive(async ({ jwt, set, headers }) => {
      const bearer = headers.authorization?.split(" ")[1];

      if (!bearer) {
        set.status = 401;

        return {
          authorized: false,
          userId: null,
        };
      }

      const jwtPayload = await jwt.verify(bearer);

      if (!jwtPayload) {
        set.status = 401;

        return {
          authorized: false,
          userId: null,
        };
      }

      const id = jwtPayload.id;
      const user = UserModel.getUserById(id as number);

      if (!user) {
        set.status = 401;

        return {
          authorized: false,
          userId: null,
        };
      }
      return {
        authorized: true,
        userId: id,
      };
    });
};
