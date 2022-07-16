import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { productList } from "@mocks/product-list";
import { APIGatewayProxyResult } from "aws-lambda";

const getProducts = middyfy(async (): Promise<APIGatewayProxyResult> => {
  return formatJSONResponse({ data: productList }, 200);
});

export const main = middyfy(getProducts);
