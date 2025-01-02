import { Elysia } from "elysia";

const app = new Elysia().get("/", "hello").post("/hi", "hi").listen(3000);
// Elysia.handle adalah fungsi untuk memproses permintaan aktual yang dikirim ke server.
app.handle(new Request("http://localhost/")).then(console.log);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
