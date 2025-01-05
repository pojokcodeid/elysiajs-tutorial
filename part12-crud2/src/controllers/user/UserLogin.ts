import Elysia, { t } from "elysia";
import UserModel from "../../models/UserModel";
import jwt from "@elysiajs/jwt";
import { logger } from "../../utils/logger";

class UserLogin {
  public init() {
    return new Elysia()
      .use(
        jwt({
          name: "jwt",
          secret: Bun.env.JWT_SECRET!,
          exp: "1d",
        }),
      )
      .post(
        "/login",
        async ({ body, jwt }) => {
          const user = await UserModel.verifyUser(body.email, body.password);
          if (user) {
            return {
              message: "login success",
              data: { ...user, token: await jwt.sign({ id: user.id }) },
            };
          }
        },
        {
          body: t.Object({
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
            summary: "Login user",
            description: "Login user",
            tags: ["Auth"],
            security: [{ JwtAuth: [] }],
            responses: {
              200: {
                description: "login success",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "login success",
                        },
                        data: {
                          type: "object",
                          properties: {
                            id: {
                              type: "number",
                              example: 1,
                            },
                            email: {
                              type: "string",
                              example: "code@gmail",
                            },
                            name: {
                              type: "string",
                              example: "Pojok Code",
                            },
                            token: {
                              type: "string",
                              example:
                                "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNzM2MTI2Nzc4fQ.947ogs_lEJEx3LVs0490itjk8aADql4Kfucen15al_U",
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
              500: {
                description: "Internal Server Error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                          example: "Internal Server Error",
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
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                        example: "code@gmail",
                      },
                      password: {
                        type: "string",
                        example: "P@ssw0rd123",
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

export default new UserLogin().init();
