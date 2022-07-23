import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { productList } from "@mocks/product-list";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const getProductById = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { id: searchId } = event.pathParameters;
    try {
      const product = await productList.find(({ id }) => id === searchId);
      if (product) {
        return formatJSONResponse(
          {
            data: product,
          },
          200
        );
      }
      return formatJSONResponse(
        {
          message: `Can't find product ${searchId}`,
        },
        404
      );
    } catch (e) {
      return formatJSONResponse(
        {
          message: e,
        },
        500
      );
    }
  }
);

export const main = middyfy(getProductById);
