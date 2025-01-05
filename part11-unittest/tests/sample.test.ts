import { describe, expect, it } from "bun:test";
import app from "../src/app";

describe("Elysia", () => {
  const appNew = app;
  it("return a response", async () => {
    const response = await appNew
      .handle(new Request("http://localhost/"))
      .then((res) => res.text());

    expect(response).toBe("Hello Elysia");
  });
  it("return a response test", async () => {
    const response = await appNew
      .handle(new Request("http://localhost/test"))
      .then((res) => res.text());

    expect(response).toBe("test");
  });
});
