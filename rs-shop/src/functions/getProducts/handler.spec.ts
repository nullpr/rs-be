import { Context } from "aws-lambda";
import { main as handler } from "./handler";
import { productList } from "@mocks/product-list";
import { productService } from "@services/product/products";

jest.mock("@services/product/products");

jest
  .mocked(productService.getProductsList)
  .mockReturnValue(Promise.resolve(productList));

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
