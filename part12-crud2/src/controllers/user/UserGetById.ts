import Elysia, { t } from "elysia";
import UserModel from "../../models/UserModel";

class UserGetById {
  public init() {
    return new Elysia().get(
      "/:id",
      async ({ params }) => {
        const id = params.id;
        const user = await UserModel.getUserById(id);
        if (user) {
          return {
            message: "get data success",
            data: user,
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
          summary: "Get user by id",
          description: "Get user by id",
          tags: ["users"],
          security: [{ JwtAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "number",
              },
              description: "id user",
              example: 1,
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
                            type: "number",
                            example: 1,
                          },
                          name: {
                            type: "string",
                            example: "Pojok Code",
                          },
                          email: {
                            type: "string",
                            example: "code@gmail",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: "User not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "User not found",
                      },
                      data: {
                        type: "object",
                        properties: {},
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

export default new UserGetById().init();
