import Elysia, { t } from "elysia";
import UserModel from "../../models/UserModel";
import { logger } from "../../utils/logger";

class UserUpdate {
  public init() {
    return new Elysia().put(
      "/:id",
      async ({ params, body }) => {
        const id = params.id;
        const user = await UserModel.updateUser(
          id,
          body.name,
          body.email,
          body.password,
        );
        if (user) {
          return {
            message: "update data success",
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
        body: t.Object({
          name: t.String({
            required: true,
            examples: ["Pojok Code"],
            errors: "Name is required",
          }),
          email: t.String({
            required: true,
            format: "email",
            examples: ["code@gmail.com"],
            errors: "Email is required",
          }),
          password: t.String({
            required: true,
            examples: ["P@ssw0rd123"],
            errors: "Password is required",
          }),
        }),
        error: ({ code, error }) => {
          switch (code) {
            case "VALIDATION": {
              const fields = [
                {
                  path: "/email",
                  field: "email",
                  message: "Invalid email.",
                },
                {
                  path: "/name",
                  field: "name",
                  message: "Name is required.",
                },
                {
                  path: "/password",
                  field: "password",
                  message: "Password is required. min length 8.",
                },
              ];
              logger.error(error);
              return {
                message: fields[0].message,
                data: null,
              };
            }
            default: {
              return {
                message: error,
                data: null,
              };
            }
          }
        },
        detail: {
          summary: "Update user by id",
          description: "Update user by id",
          tags: ["users"],
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
                            type: "integer",
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
                          createdAt: {
                            type: "string",
                            example: "2024-12-27T10:42:00.758Z",
                          },
                          updatedAt: {
                            type: "string",
                            example: "2024-12-27T10:42:00.758Z",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Name is required.",
                      },
                      data: {
                        type: "object",
                        properties: {},
                      },
                    },
                    required: ["message", "data"],
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
          },
        },
      },
    );
  }
}

export default new UserUpdate().init();
