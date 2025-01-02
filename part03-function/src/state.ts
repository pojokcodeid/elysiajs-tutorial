import { Elysia } from "elysia";

const app = new Elysia()
  .state("counter", 0)
  .get("/increment", ({ store }) => {
    store.counter++;
    return store.counter;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
