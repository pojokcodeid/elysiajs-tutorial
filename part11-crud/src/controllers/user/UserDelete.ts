import Elysia, { t } from "elysia";
import UserModel from "../../models/UserModel";

class UserDelete {
  public init() {
    return new Elysia().delete(
      "/:id",
      async ({ params }) => {
        const id = params.id;
        const user = await UserModel.deleteUser(id);
        if (user) {
          return {
            message: "delete data success",
            data: user,
          };
        }
      },
      {
        params: t.Object({
          id: t.Number({
            required: true,
            examples: [9],
          }),
        }),
        detail: {
          summary: "Delete user by id",
          description: "Delete user by id",
          tags: ["users"],
          security: [{ JwtAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "number",
                example: 9,
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
                        type: "boolean",
                        example: true,
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

export default new UserDelete().init();
