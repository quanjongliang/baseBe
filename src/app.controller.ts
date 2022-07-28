import { CloundinaryService } from "@/cloudinary";
import { DriveService } from "@/drive";
import { MailerService } from "@/mailer";
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AppService } from "./app.service";
import * as fs from "fs";
import { Response } from "express";
import { PdfService } from "@/pdf";
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private cloundinaryService: CloundinaryService,
    private driveService: DriveService,
    private pdfService: PdfService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.driveService.uploadFile(file);
  }

  @Delete(":publicId")
  deleteFile(@Param("publicId") publicId: string) {
    return this.cloundinaryService.deleteFile(publicId);
  }

  @Get("concat")
  getConcatField() {
    return this.appService.getConcat();
  }
  @Get("download/:id")
  async downloadFile(
    @Param("id") id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const { newName, mimeType, file } = await this.driveService.downloadFile(
        id
      );
      // res.set({
      //   "Content-Type": mimeType,
      //   "Content-Disposition": `attachment; filename="${newName}"`,
      // });
      res.setHeader("Content-type", mimeType);
      res.setHeader("Content-disposition", "attachment; filename=" + newName);
      res.send(file);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
  @Get("pdf/:name")
  async getPdfFile(@Param() name: string, @Res() res: Response) {
    // return this.pdfService.createFilePdf(name, res);
    return this.pdfService.createResumePdf(res);
  }

  @Get('compare-image')
  async compareImage(){
    return this.appService.compareImage()
  }
}
