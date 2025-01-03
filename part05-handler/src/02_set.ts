import { Elysia } from "elysia";
// set dalam ElysiaJS adalah cara untuk mengatur nilai-nilai dalam respons HTTP
const app = new Elysia()
  .get("/", ({ set, error }) => {
    set.headers = { "X-Teapot": "true" };
    set.status = 418;

    return error(418, "I am a teapot");
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
