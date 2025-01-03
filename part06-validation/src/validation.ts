import { Elysia, t } from "elysia";
new Elysia()
  .post(
    "/submit-form",
    // return data
    ({ body, set }) => {
      set.status = 200;
      return {
        200: {
          message: "Form submitted successfully",
          data: {
            name: body.name,
            age: body.age,
          },
        },
      };
    },
    // validation rule
    {
      body: t.Object({
        name: t.String({
          required: true,
          minLength: 3,
          maxLength: 10,
          error: `Name must be between 3 and 10 characters`,
        }),
        age: t.Number({
          required: true,
          minimum: 18,
          maximum: 99,
          error: `Age must be between 18 and 99`,
        }),
      }),
      // error return
      error({ code, error }) {
        if (code == "VALIDATION") {
          return {
            message: error.message,
            data: null,
          };
        }
      },
      // response type
      response: {
        200: t.Object({
          message: t.String(),
          data: t.Object({
            name: t.String(),
            age: t.Number(),
          }),
        }),
      },
    }
  )
  .listen(3000);
