import { S3Handler } from "aws-lambda";
import { AwsSdkS3Service } from "@services/aws/S3";
import csvParser from "csv-parser";

export const main: S3Handler = async (event) => {
  try {
    const sdkS3Service = new AwsSdkS3Service();
    for (const record of event.Records) {
      const {
        object: { key },
      } = record.s3;
      console.log("record", record);

      const s3Object = await sdkS3Service.getObject({ Key: key });
      console.log("object", { s3Object });

      await new Promise(() =>
        s3Object
          .createReadStream()
          .pipe(csvParser())
          .on("error", console.error)
          .on("end", async () => {
            await sdkS3Service.moveObject(key);
          })
      );
    }
  } catch (e) {
    console.error(e);
  }
};
