import { Elysia } from "elysia";
import { exampleRoutes } from "./routes/example";

const app = new Elysia();

app
  .use(exampleRoutes)
  // akan selalu dipanggil ketika ada request
  .onRequest(({ request }) => {
    console.log(
      `Global Before handling request: ${request.method} ${request.url}`
    );
  })
  .onAfterHandle(({ server, request }) => {
    console.log("Global After request handled:", server?.requestIP(request));
  })
  // akan selalu dipanggil ketika ada error
  .onError(({ error }) => {
    if (error instanceof Error) {
      console.error("Global An error occurred:", error.message);
    } else {
      console.error("Glonbal An error occurred:", error);
    }
  })
  .get("/", () => "Welcome to ElysiaJS and Bun with TypeScript!")
  .get("/test", () => "Testing", {
    // dipanggil di route ini saja
    beforeHandle: ({ request }) => {
      console.log(
        `Local /Test Before handling request: ${request.method} ${request.url}`
      );
    },
    afterHandle: ({ server, request }) => {
      console.log(
        "Local /Test After request handled:",
        server?.requestIP(request)
      );
    },
  })
  .get("/error", () => {
    throw new Error("This is a simulated error!");
  })
  .listen(3000);

console.log("Server is running on http://localhost:3000");
