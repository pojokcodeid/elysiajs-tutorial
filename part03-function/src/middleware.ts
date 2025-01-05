import Elysia, { Context } from "elysia";

// Middleware untuk logging
const loggerMiddleware = (app: Elysia) => {
  return app.derive(() => {
    console.log("Pesan dari middleware...........");
  });
};

const app = new Elysia()
  .use(loggerMiddleware)
  .onError(({ code, error, path }) => {
    return {
      status: code,
      body: { error, path },
    };
  })
  .get("/secure", ({ headers, error }) => {
    if (!headers["authorization"]) {
      throw error(401, "Unauthorized");
    }
    return "Welcome to secure route!";
  })
  .get("/error", ({ error }) => {
    throw error(500, "tERJADI KESALAHAN, Internal Server Error");
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
