import { Elysia } from "elysia";

// konteks dalam ElysiaJS adalah informasi yang unik untuk setiap permintaan dari klien

const app = new Elysia()
  .get("/", (context) => console.log(context))
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
