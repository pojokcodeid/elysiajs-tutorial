import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/test", () => "test");

export default app;
