import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { APIGatewayProxyResult } from "aws-lambda";
import { productService } from "@services/product/products";

const getProducts = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productService.getProductsList();

    return formatJSONResponse({ data: products }, 200);
  } catch (e) {
    return formatJSONResponse({ message: e.message }, 500);
  }
};

export const main = middyfy(getProducts);
