import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { productService } from "@services/product/products";

const getProductById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { id: searchId } = event.pathParameters;
  try {
    const product = await productService.getProductById(searchId);
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
};

export const main = middyfy(getProductById);
