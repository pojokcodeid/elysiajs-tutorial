import Elysia from "elysia";

const app = new Elysia()
  .get("/", () => "Hello, World!")
  .post("/data", ({ body }) => {
    return `Data received: ${JSON.stringify(body)}`;
  })
  .put("/update", ({ body }) => {
    return `Data updated: ${JSON.stringify(body)}`;
  })
  .delete("/delete/:id", ({ params }) => {
    return `Item with ID ${params.id} deleted.`;
  })
  .listen(3000);
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
