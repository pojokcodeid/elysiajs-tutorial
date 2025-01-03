import { Elysia } from "elysia";

export const exampleRoutes = new Elysia()
  .onRequest(({ request }) => {
    console.log(
      "ini jadinya global onRequest Hook Triggered for Example Route"
    );
  })
  .get(
    "/example",
    ({ set }) => {
      const response = "Hello from Example Route";
      set.headers["Custom-Header"] = "ElysiaLifeCycleExample";
      return response.toUpperCase(); // Ubah respons di sini
    },
    {
      // dipanggil di route ini saja
      beforeHandle: ({ request }) => {
        console.log(
          `Local /example Before handling request: ${request.method} ${request.url}`
        );
      },
      afterHandle: ({ server, request }) => {
        console.log(
          "Local /example After request handled:",
          server?.requestIP(request)
        );
      },
    }
  );
