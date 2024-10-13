import { Controller, Post, Delete, Body, Header, HttpCode } from '@nestjs/common';
import { R2Service } from './r2.service';
import { UploadFileDto } from './dto/upload-file/upload-file.dto';

// @Controller('r2')
// export class R2Controller {
//   constructor(private readonly r2Service: R2Service) {}

//   @Post('upload')
//   async uploadFile(@Body() uploadFileDto: UploadFileDto) {
//     const { filename, file } = uploadFileDto;
//     return this.r2Service.uploadFile(file, filename);
//   }

//   @Delete('delete')
//   @HttpCode(204)
//   async deleteFile(@Body('filename') filename: string) {
//     await this.r2Service.deleteFile(filename);
//   }
// }
