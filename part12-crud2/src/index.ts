import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import UserController from "./controllers/user/UserController";
import TodoController from "./controllers/todo/TodoController";

new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Todo API",
          version: "1.0.0",
          description:
            "A simple todo API that allows you to create, read, update, and delete todos.",
        },
        components: {
          securitySchemes: {
            JwtAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        servers: [{ url: "http://localhost:3000" }],
      },
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  )
  .use(UserController)
  .use(TodoController)
  .listen(Bun.env.PORT || 3000);

console.log(`🦊 Elysia is running at http://localhost:${Bun.env.PORT}`);
