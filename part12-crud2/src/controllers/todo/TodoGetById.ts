import Elysia, { t } from "elysia";
import TodoModel from "../../models/TodoModel";

class TodoGetById {
  public init() {
    return new Elysia().get(
      "/:id",
      async ({ params, set }) => {
        const id = params.id;
        const todo = await TodoModel.getTodoById(id);
        if (todo) {
          set.status = 200;
          return {
            message: "get data success",
            data: todo,
          };
        } else {
          set.status = 404;
          return {
            message: "data not found",
            data: {},
          };
        }
      },
      {
        params: t.Object({
          id: t.Number({
            required: true,
          }),
        }),
        detail: {
          summary: "Get todo by id",
          description: "Get todo by id",
          tags: ["todos"],
          security: [{ JwtAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "number",
                example: 1,
              },
            },
          ],
          responses: {
            200: {
              description: "get data success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "get data success",
                      },
                      data: {
                        type: "object",
                        properties: {
                          id: {
                            type: "integer",
                            example: 1,
                          },
                          title: {
                            type: "string",
                            example: "example todo",
                          },
                          userId: {
                            type: "integer",
                            example: 1,
                          },
                          description: {
                            type: "string",
                            example: "ini adalah contoh descripsi",
                          },
                          createdAt: {
                            type: "string",
                            example: "2023-01-01T00:00:00.000Z",
                          },
                          updatedAt: {
                            type: "string",
                            example: "2023-01-01T00:00:00.000Z",
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

export default new TodoGetById().init();
