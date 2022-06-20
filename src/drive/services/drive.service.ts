import { DriveReposiotry } from "@/repository/drive";
import { BadRequestException, Injectable } from "@nestjs/common";
import { GoogleAuth } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import {
  getFileMediaDrive,
  getFileMetaDataDrive,
  removeFileFs,
} from "../common";
@Injectable()
export class DriveService {
  private googleAuth: GoogleAuth;
  private driveService: drive_v3.Drive;
  constructor(private driveRepository: DriveReposiotry) {
    this.googleAuth = new google.auth.GoogleAuth({
      keyFile: "src/core/constants/googlekey.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    this.driveService = google.drive({ version: "v3", auth: this.googleAuth });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const { mimetype, path, filename } = file;
      const media = getFileMediaDrive(mimetype, path);
      const fileMetaData = getFileMetaDataDrive(filename);
      const response = await this.driveService.files.create({
        media,
        fields: "id",
        requestBody: fileMetaData,
      });
      await this.setFilePublic(response.data.id);
      removeFileFs(path);
      const { data } = await this.getFileUrlById(response.data.id);
      return this.driveRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async getFileUrlById(fileId: string) {
    return this.driveService.files.get({
      fileId,
      fields: "*",
    });
  }
  async setFilePublic(fileId: string) {
    return this.driveService.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
  }
  async deleteFile(fileId: string) {
    return this.driveService.files.delete({ fileId });
  }
}
