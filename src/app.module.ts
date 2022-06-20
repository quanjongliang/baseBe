import { AuthModule } from "@/auth";
import { CloudinaryModule } from "@/cloudinary";
import { MailerModule } from "@/mailer";
import { RepositoryModule } from "@/repository";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "@/database";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MailerModule,
    RepositoryModule,
    AuthModule,
    MulterModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
