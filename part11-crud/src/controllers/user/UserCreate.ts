import Elysia, { t } from "elysia";
import UserModel from "../../models/UserModel";
import { logger } from "../../utils/logger";

class UserCreate {
  public createUser() {
    return new Elysia().post(
      "/",
      async ({ body }) => {
        const user = await UserModel.createUser(
          body.name,
          body.email,
          body.password,
        );
        if (user) {
          return {
            message: "create data success",
            data: user,
          };
        }
      },
      {
        body: t.Object({
          name: t.String({
            required: true,
            examples: ["Pojok Code"],
            errors: "Name is required",
          }),
          email: t.String({
            required: true,
            format: "email",
            examples: ["code@gmail"],
            errors: "Email is required",
          }),
          password: t.String({
            required: true,
            examples: ["12345678"],
            minLength: 8,
            errors: "Password is required, min length 8",
          }),
        }),
        error({ code, error }) {
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

              const errors = fields
                .filter((field) =>
                  error.all.some((e) => "path" in e && e.path === field.path),
                )
                .map((field) => ({
                  message: field.message,
                }));
              logger.error(error);
              return {
                message: errors[0].message,
                data: null,
              };
            }
          }
        },
        detail: {
          summary: "Create user",
          description: "Create user",
          tags: ["Auth"],
          security: [{ JwtAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
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
                    required: ["message", "data"],
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
          },
        },
      },
    );
  }
}

export default new UserCreate().createUser();
