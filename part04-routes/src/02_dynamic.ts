import { Elysia } from "elysia";

const app = new Elysia()
  .get("/id/:id", ({ params: { id } }) => id)
  .get("/id/:id/:name", ({ params: { id, name } }) => id + " " + name)
  .get("/optional/:id?", ({ params: { id } }) => `id ${id ? id : "kosong"}`)
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

// /id/1	                -> 1
// /id/123	              -> 123
// /id/anything	          -> anything
// /id/anything?name=salt	-> anything
// /id	                  -> Not Found
// /id/anything/rest	    -> Not Found (setelah ditambahkan /:name baru bisa)
// /id/anything/rest	    -> anything rest
// /optional/1            -> id 1
// /optional/              -> id kosong
