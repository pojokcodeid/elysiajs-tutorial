import Elysia from "elysia";
import TodoModel from "../../models/TodoModel";

class TodoGetAll {
  public init() {
    return new Elysia().get(
      "/",
      async () => {
        const todos = await TodoModel.getAllTodos();
        if (todos) {
          return {
            message: "get data success",
            data: todos,
          };
        }
      },
      {
        detail: {
          summary: "Get all todos",
          description: "Get all todos",
          tags: ["todos"],
          security: [{ JwtAuth: [] }],
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
                        type: "array",
                        items: {
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

export default new TodoGetAll().init();
