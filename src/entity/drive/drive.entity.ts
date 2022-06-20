import { Column, Entity, PrimaryColumn } from "typeorm";

export const DRIVE_TABLE_NAME = "drive";

@Entity(DRIVE_TABLE_NAME)
export class Drive {
  @PrimaryColumn()
  id: string;
  @Column({ nullable: true, type: "text" })
  webContentLink: string;
  @Column({ nullable: true, type: "text" })
  webViewLink: string;
  @Column({ nullable: true, type: "text" })
  name: string;
  @Column({ nullable: true, type: "text" })
  iconLink: string;
  @Column({ nullable: true, type: "text" })
  thumbnailLink: string;
  @Column({ nullable: true, type: "text" })
  createdTime: Date;
}
