import { Elysia } from "elysia";

const app = new Elysia()
  .get("/get", "hello")
  .post("/post", "hi")
  .route("M-SEARCH", "/m-search", "connect")
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

// cara call dengan curl
// curl -X GET http://localhost:3000/get
// curl -X POST http://localhost:3000/post
// curl -X M-SEARCH http://localhost:3000/m-search
