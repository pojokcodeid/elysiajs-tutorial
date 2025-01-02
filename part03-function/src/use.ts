import { Elysia } from "elysia";

const hello = new Elysia().get("/hello", () => "Hello, World!");

const app = new Elysia()
  .use(hello)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
