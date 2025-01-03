import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(swagger())
  .get("/", () => "hi", {
    response: t.String({ description: "sample description" }),
  })
  .post(
    "/json/:id",
    ({ body, params: { id }, query: { name } }) => ({
      ...body,
      id,
      name,
    }),
    {
      params: t.Object({
        id: t.String(),
      }),
      query: t.Object({
        name: t.String(),
      }),
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
      response: t.Object(
        {
          username: t.String(),
          password: t.String(),
          id: t.String(),
          name: t.String(),
        },
        { description: "sample description" }
      ),
    }
  )
  .listen(8080);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
