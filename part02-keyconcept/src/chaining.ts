import { Elysia } from "elysia";

new Elysia()
  .state("build", 1)
  .get("/", ({ store: { build } }) => build)
  .listen(3000);
