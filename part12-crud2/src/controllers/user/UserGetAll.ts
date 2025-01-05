import Elysia from "elysia";
import UserModel from "../../models/UserModel";

class UserGetAll {
  public getAllUsers() {
    return new Elysia().get(
      "/",
      async () => {
        const users = await UserModel.getAllUsers();
        if (users) {
          return {
            message: "get data success",
            data: users,
          };
        }
      },
      {
        detail: {
          summary: "Get all users",
          description: "Get all users",
          tags: ["users"],
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
                          required: [
                            "id",
                            "name",
                            "email",
                            "createdAt",
                            "updatedAt",
                          ],
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
          },
        },
      },
    );
  }
}

export default new UserGetAll().getAllUsers();
