import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3Folders } from "../../common/constatns";
import { AwsSdkS3Service } from "@services/aws/S3";
import path from "path";

const importProductsFile = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { name } = event.queryStringParameters ?? {};
    const key = path.join(S3Folders.UPLOADED, name);
    const sdkS3Service = new AwsSdkS3Service();
    const signedUrl = await sdkS3Service.getSignedUrl(key);

    return formatJSONResponse(
      {
        signedUrl,
      },
      200
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

export const main = middyfy(importProductsFile);
