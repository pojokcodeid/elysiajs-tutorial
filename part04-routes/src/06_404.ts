import { Elysia } from "elysia";

// untuk melihatnya coba di browser
const app = new Elysia()
  .get("/", "hi")
  .onError(({ code }) => {
    if (code === "NOT_FOUND") {
      return "Route not found :(";
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
