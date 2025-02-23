import Elysia from "elysia";

const app = new Elysia()
  .derive(() => ({
    currentTime: () => new Date().toISOString(),
  }))
  .get("/time", ({ currentTime }) => currentTime())
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
