import Elysia, { t } from "elysia";
import TodoModel from "../../models/TodoModel";

class TodoDelete {
  public init() {
    return new Elysia().delete(
      "/:id",
      async ({ params }) => {
        const id = Number(params.id);
        // check user exists
        const td = await TodoModel.getTodoById(id);
        if (!td) {
          return {
            message: "todo not found",
            data: {},
          };
        }
        // delete todo if exists
        const todo = await TodoModel.deleteTodo(id);
        if (todo) {
          return {
            message: "delete data success",
            data: todo,
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
          summary: "Delete todo by id",
          description: "Delete todo by id",
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
              description: "delete data success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "delete data success",
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
              description: "Anauthorized",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Anauthorized",
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
            404: {
              description: "data not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "data not found",
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

export default new TodoDelete().init();
