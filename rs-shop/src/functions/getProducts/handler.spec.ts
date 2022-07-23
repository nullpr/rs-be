import { Context } from "aws-lambda";
import { main as handler } from "./handler";
import { productList } from "@mocks/product-list";

describe("getProducts", () => {
  const context = {} as Context;

  it("should return mocked data with status code 200", async () => {
    const event = {
      headers: { "Content-Type": "application/json" },
      body: null,
    };

    const response = await handler(event, context);

    expect(response).toMatchObject({
      body: JSON.stringify({ data: productList }),
      statusCode: 200,
    });
  });
});
