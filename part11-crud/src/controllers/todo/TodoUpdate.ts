import Elysia, { t } from "elysia";
import { authMiddleware } from "../../utils/Token";
import TodoModel from "../../models/TodoModel";

class TodoUpdate {
  public init() {
    return new Elysia().use(authMiddleware).put(
      "/:id",
      async ({ params, body, userId, set }) => {
        const id = Number(params.id);
        const { title, description } = body;
        // check exists todo
        const td = await TodoModel.getTodoById(id);
        if (!td) {
          set.status = 404;
          return {
            message: "data not found",
            data: {},
          };
        }
        // update todo if exists
        const todo = await TodoModel.updateTodo(
          id,
          title,
          description,
          Number(userId),
        );
        if (todo) {
          set.status = 200;
          return {
            message: "update data success",
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
          summary: "Update todo by id",
          description: "Update todo by id",
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
            200: {
              description: "update data success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "update data success",
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
                          user_id: {
                            type: "number",
                            example: 1,
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

export default new TodoUpdate().init();
