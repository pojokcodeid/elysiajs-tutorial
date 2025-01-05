import Elysia, { t } from "elysia";
import TodoModel from "../../models/TodoModel";
import { authMiddleware } from "../../utils/Token";

class TodoCreate {
  public init() {
    return new Elysia().use(authMiddleware).post(
      "/",
      async ({ body, userId }) => {
        console.log(userId);
        const { title, description } = body;
        const todo = await TodoModel.createTodo(
          title,
          description,
          Number(userId),
        );
        if (todo) {
          return {
            message: "create data success",
            data: todo,
          };
        }
      },
      {
        body: t.Object({
          title: t.String({
            required: true,
            examples: ["Todo 1"],
          }),
          description: t.String({
            required: true,
            examples: ["Todo 1 description"],
          }),
        }),
        detail: {
          summary: "Create todo",
          description: "Create todo",
          tags: ["todos"],
          security: [{ JwtAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "Todo 1",
                    },
                    description: {
                      type: "string",
                      example: "Todo 1 description",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "create data success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "create data success",
                      },
                      data: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            example: 1,
                          },
                          title: {
                            type: "string",
                            example: "Todo 1",
                          },
                          description: {
                            type: "string",
                            example: "Todo 1 description",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Unauthorized",
                      },
                      data: {
                        type: "object",
                        example: {},
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    );
  }
}

export default new TodoCreate().init();
