import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import inputOutputLogger from "@middy/input-output-logger";
import httpErrorHandler from "@middy/http-error-handler";

export const middyfy = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(
      inputOutputLogger({
        logger: (request) => {
          console.log(request.event ?? request.response);
        },
      })
    )
    .use(httpErrorHandler());
};
