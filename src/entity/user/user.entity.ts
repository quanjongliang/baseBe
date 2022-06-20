import { Exclude } from "class-transformer";
import { Entity, Column } from "typeorm";
import { BaseColumn } from "../base";

export enum USER_ROLE {
  ADMIN = "ADMIN",
  MOD = "MOD",
  USER = "USER",
}

export interface PayloadTokenUser {
  id: string;
  username: string;
  role: USER_ROLE;
  phone?: string;
  email?: string;
}

export type UserWithOutPassword = Omit<User, "password">;

export const USER_TABLE_NAME = "user";

@Entity("user")
export class User extends BaseColumn {
  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ enum: USER_ROLE, default: USER_ROLE.USER })
  role: USER_ROLE;

  @Column({ default: false })
  confirmedEmail: boolean;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: "text", nullable: true })
  public currentHashedRefreshToken: string;
}
