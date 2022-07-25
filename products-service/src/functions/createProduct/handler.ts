import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { productService } from "../../services";
import validator from "@middy/validator";
import { schema } from "@functions/createProduct/schema";
import { Product } from "@models/product";

const createProduct = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { body } = event;
    const product: Product = typeof body === "string" ? JSON.parse(body) : body;

    const id = await productService.createProduct(product);

    return formatJSONResponse({ id }, 201);
  } catch (e) {
    return formatJSONResponse({ message: e.message }, 500);
  }
};

export const main = middyfy(createProduct).use(
  validator({
    inputSchema: schema,
  })
);
