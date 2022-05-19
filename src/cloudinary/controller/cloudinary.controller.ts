import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { CloundinaryService } from "../service";
import { v4 as uuid } from "uuid";
import { JwtAuthGuard, Roles, RolesGuard } from "@/auth";
import { MOD_ADMIN_ROLE } from "@/core";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("cloundinary")
@ApiBearerAuth()
@Controller("cloundinary")
export class CloundinaryController {
  constructor(private cloudinaryService: CloundinaryService) {}

  @Get()
  async getIsBannerImage() {
    return this.cloudinaryService.getIsBannerFiles();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...MOD_ADMIN_ROLE)
  @UseInterceptors(
    FilesInterceptor("files", 3, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          const randomName = uuid();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async postBannerImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.cloudinaryService.uploadMultiFiles(files);
  }
}
