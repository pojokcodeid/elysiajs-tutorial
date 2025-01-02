import Elysia from "elysia";

const app = new Elysia()
  .get("/secure", ({ headers }) => {
    if (!headers["authorization"]) {
      throw new Error("Unauthorized");
    }
    return "Welcome to secure route!";
  })
  .onError((error) => {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    } else {
      return `Error: ${String(error)}`;
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
