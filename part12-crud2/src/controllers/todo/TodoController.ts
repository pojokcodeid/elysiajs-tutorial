import Elysia from "elysia";
import TodoGetAll from "./TodoGetAll";
import { authMiddleware } from "../../utils/Token";
import TodoGetById from "./TodoGetById";
import TodoCreate from "./TodoCreate";
import TodoUpdate from "./TodoUpdate";
import TodoDelete from "./TodoDelete";
import { logger } from "../../utils/logger";

class TodoController {
  init() {
    return new Elysia({ prefix: "/todos" })
      .onError((error) => {
        logger.error(error);
        if ("message" in error) {
          return {
            message: error.message,
            data: null,
          };
        } else {
          return {
            // message: "Internal Server Error, please contact admin",
            message: error,
            data: {},
          };
        }
      })
      .use(authMiddleware)
      .onBeforeHandle(({ authorized }) => {
        if (!authorized) {
          return {
            message: "Anauthorized",
            data: {},
          };
        }
      })
      .use(TodoGetAll)
      .use(TodoGetById)
      .use(TodoCreate)
      .use(TodoUpdate)
      .use(TodoDelete);
  }
}

export default new TodoController().init();
