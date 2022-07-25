import { S3 } from "aws-sdk";
import {
  CopyObjectRequest,
  DeleteObjectRequest,
  GetObjectRequest,
} from "aws-sdk/clients/s3";
import { BUCKET_NAME, S3Folders } from "../../common/constatns";
import path from "path";
import { getFileNameFromKey } from "../../common/helpers";

export class AwsSdkS3Service {
  private readonly bucketName: string;

  private s3: S3;

  constructor() {
    this.bucketName = BUCKET_NAME;
    this.s3 = new S3({ region: "eu-west-1", signatureVersion: "v4" });
  }

  public async getSignedUrl(key: string): Promise<string> {
    return this.s3.getSignedUrlPromise("putObject", {
      Expires: 60,
      Bucket: this.bucketName,
      Key: key,
    });
  }

  public async getObject(getObjectParams: Omit<GetObjectRequest, "Bucket">) {
    return this.s3.getObject({
      Bucket: this.bucketName,
      ...getObjectParams,
    });
  }

  public async moveObject(key: string) {
    await this.copyObject({
      CopySource: path.join(this.bucketName, key),
      Bucket: this.bucketName,
      Key: path.join(S3Folders.PARSED, getFileNameFromKey(key)),
    });
    await this.deleteObject({ Bucket: this.bucketName, Key: key });
  }

  private async copyObject(copyObjectParams: CopyObjectRequest) {
    return this.s3.copyObject(copyObjectParams).promise();
  }

  private async deleteObject(deleteObjectParams: DeleteObjectRequest) {
    return this.s3.deleteObject(deleteObjectParams).promise();
  }
}
