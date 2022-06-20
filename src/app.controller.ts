import { MailerService } from "@/mailer";
import {
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";
import { AppService } from "./app.service";
import { CloundinaryService } from "@/cloudinary";
import { Cloundinary } from "@/entity";
import { UploadFileInterceptor } from "./interceptors/upload-file.interceptor";
import { DriveService } from "@/drive";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailerService: MailerService,
    private cloundinaryService: CloundinaryService,
    private driveService: DriveService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const randomName = uuid();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // return this.cloundinaryService.uploadFile(file);
    return this.driveService.uploadFile(file);
  }
  // @Post("upload")
  // @UseInterceptors(
  //   FileInterceptor("file", {
  //     storage: diskStorage({
  //       destination: "./uploads",
  //       filename: (_req, file, cb) => {
  //         const randomName = uuid();
  //         cb(null, `${randomName}${extname(file.originalname)}`);
  //       },
  //     }),
  //   })
  // )
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   // return this.cloundinaryService.uploadFile(file);
  // }

  @Delete(":publicId")
  deleteFile(@Param("publicId") publicId: string) {
    return this.cloundinaryService.deleteFile(publicId);
  }
}
