import { handlerPath } from "@libs/handler-resolver";
import { BUCKET_NAME, S3Folders } from "../../common/constatns";

export const importFileParser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        event: "s3:ObjectCreated:*",
        bucket: BUCKET_NAME,
        rules: [
          {
            prefix: S3Folders.UPLOADED,
          },
          {
            suffix: ".csv",
          },
        ],
        existing: true,
      },
    },
  ],
};
