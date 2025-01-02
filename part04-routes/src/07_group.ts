// import { Elysia } from "elysia";

// new Elysia()
//   .post("/user/sign-in", "Sign in")
//   .post("/user/sign-up", "Sign up")
//   .post("/user/profile", "Profile")
//   .listen(3000);

// gunakan group
// import { Elysia } from "elysia";

// const app = new Elysia()
//   .group("/user", (app) =>
//     app
//       .post("/sign-in", "Sign in")
//       .post("/sign-up", "Sign up")
//       .post("/profile", "Profile")
//   )
//   .listen(3000);

// contoh dengan prefix
import { Elysia } from "elysia";

const users = new Elysia({ prefix: "/user" })
  .post("/sign-in", "Sign in")
  .post("/sign-up", "Sign up")
  .post("/profile", "Profile");

const app = new Elysia().use(users).get("/", "hello world").listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
