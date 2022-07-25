import AWS from "aws-sdk-mock";
import { main as handler } from "./handler";

// https://github.com/dwyl/aws-sdk-mock/issues/197 that's why signed url is empty object i response
AWS.mock("S3", "getSignedUrlPromise", async () => "some/url");

describe("importProductsFile", () => {
  const invalidTypeErrorMessage = '{"message":{"code":"ERR_INVALID_ARG_TYPE"}}';

  it("should return 500 if query param name is missing", async () => {
    const event = {
      headers: { "Content-Type": "application/json" },
      body: null,
    };

    const { body } = await handler(event, null);

    expect(body).toBe(invalidTypeErrorMessage);
  });

  it("should return 500 if query params type is invalid", async () => {
    const event = {
      headers: { "Content-Type": "application/json" },
      body: null,
      queryStringParameters: { invalid: "param" },
    };

    const { body } = await handler(event, null);

    expect(body).toBe(invalidTypeErrorMessage);
  });

  it("should return 200 if query params is valid", async () => {
    const event = {
      headers: { "Content-Type": "application/json" },
      body: null,
      queryStringParameters: { name: "test" },
    };

    const { statusCode } = await handler(event, null);

    expect(statusCode).toBe(200);
  });
});
