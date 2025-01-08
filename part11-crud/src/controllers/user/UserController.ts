import Elysia from "elysia";
import UserCreate from "./UserCreate";
import UserGetAll from "./UserGetAll";
import UserLogin from "./UserLogin";
import { authMiddleware } from "../../utils/Token";
import UserGetBuId from "./UserGetById";
import UserUpdate from "./UserUpdate";
import UserDelete from "./UserDelete";
import { logger } from "../../utils/logger";

class UserController {
  public init() {
    return new Elysia({ prefix: "/users" })
      .onError((error) => {
        logger.error(error);
        if ("message" in error) {
          return {
            message: error.message,
            data: null,
          };
        } else {
          return {
            message: "Internal Server Error, please contact admin",
            // message: error,
            data: {},
          };
        }
      })
      .use(UserCreate)
      .use(UserLogin)
      .use(authMiddleware)
      .onBeforeHandle(({ authorized }) => {
        if (!authorized) {
          return {
            message: "Anauthorized",
            data: {},
          };
        }
      })
      .use(UserGetAll)
      .use(UserGetBuId)
      .use(UserUpdate)
      .use(UserDelete);
  }
}

export default new UserController().init();
