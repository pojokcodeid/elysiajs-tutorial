import { Elysia } from "elysia";

const app = new Elysia()
  .get("/id/1", "static path") // -> /id/1	static path
  .get("/id/:id", "dynamic path") // -> /id/2	dynamic path
  .get("/id/*", "wildcard path") // -> /id/2/a	wildcard path
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
