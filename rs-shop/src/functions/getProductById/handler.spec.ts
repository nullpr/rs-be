import { Context } from "aws-lambda";
import { main as handler } from "./handler";

describe("getProductByIdr", () => {
  const context = {} as Context;
  it("should return 404 if product is not found", async () => {
    const event = {
      headers: { "Content-Type": "application/json" },
      body: null,
      pathParameters: {
        id: 12,
      },
    };

    const { statusCode } = await handler(event, context);

    expect(statusCode).toBe(404);
  });

  it("should return product if product with id exists", async () => {
    const product = {
      count: 4,
      description: "Short Product Description1",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 2.4,
      title: "ProductOne",
    };
    const event = {
      headers: { "Content-Type": "application/json" },
      body: null,
      pathParameters: {
        id: product.id,
      },
    };

    const response = await handler(event, context);

    expect(response).toMatchObject({
      body: '{"data":{"count":4,"description":"Short Product Description1","id":"7567ec4b-b10c-48c5-9345-fc73c48a80aa","price":2.4,"title":"ProductOne"}}',
      statusCode: 200,
    });
  });
});
