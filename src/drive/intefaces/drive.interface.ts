import { ReadStream } from "fs";

export interface FileMetaDataDriveInferface {
  name: string;
  parents: string[];
}

export interface FileMediaDriveInteface {
  mimeType: string;
  body: ReadStream;
}
