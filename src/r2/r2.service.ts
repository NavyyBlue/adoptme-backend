import * as AWS from 'aws-sdk';
import * as stream from 'stream';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mime from 'mime-types'; // Asegúrate de instalar mime-types: npm install mime-types

@Injectable()
export class R2Service {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('R2_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('R2_SECRET_ACCESS_KEY'),
      endpoint: this.configService.get<string>('R2_ENDPOINT'),
      s3ForcePathStyle: true,
    });
  }

  async uploadFile(fileString: string, filename: string): Promise<string> {
    const bucketName = this.configService.get<string>('R2_BUCKET_NAME');
    const r2Url = this.configService.get<string>('R2_URL');
    const fileBuffer = Buffer.from(fileString, 'base64'); // Convertir el string a buffer
    const pass = new stream.PassThrough();
    pass.end(fileBuffer);

    // Determinar el ContentType basado en la extensión del archivo
    const contentType = mime.lookup(filename) || 'application/octet-stream';

    try {
      await this.s3.upload({
        Bucket: bucketName,
        Key: filename,
        Body: pass,
        ContentType: contentType,
      }).promise();
      return `${r2Url}/${bucketName}/${filename}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }

  async deleteFile(filename: string): Promise<void> {
    const bucketName = this.configService.get<string>('R2_BUCKET_NAME');
    try {
      await this.s3.deleteObject({
        Bucket: bucketName,
        Key: filename,
      }).promise();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Error deleting file');
    }
  }
}