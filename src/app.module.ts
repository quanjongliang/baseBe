import { AuthModule } from "@/auth";
import { CloudinaryModule } from "@/cloudinary";
import { MailerModule } from "@/mailer";
import { RepositoryModule } from "@/repository";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "@/database";
import { UploadFileInterceptor } from "./interceptors/upload-file.interceptor";
import { DriveModule } from "@/drive/drive.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MailerModule,
    RepositoryModule,
    AuthModule,
    MulterModule,
    CloudinaryModule,
    DriveModule,
  ],
  controllers: [AppController],
  providers: [AppService, UploadFileInterceptor],
})
export class AppModule {}
