import { Elysia } from "elysia";
// redirect digunakan untuk mengarahkan ke halaman lain
const app = new Elysia()
  .get("/", ({ redirect }) => {
    return redirect("https://google.com");
  })
  .get("/custom-status", ({ redirect }) => {
    // You can also set custom status to redirect
    return redirect("https://google.com", 302);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
