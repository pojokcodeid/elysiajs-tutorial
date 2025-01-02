import { Elysia } from "elysia";

const ip = new Elysia()
  .derive({ as: "global" }, ({ server, request }) => ({
    ip: server?.requestIP(request),
  }))
  .get("/ip1", ({ ip }) => ip);

const app = new Elysia()
  .use(ip)
  .get("/ip2", ({ ip }) => ip)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
