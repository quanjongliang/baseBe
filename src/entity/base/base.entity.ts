import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsUUID } from "class-validator";
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

const TIMESTAMP_TYPE = "timestamp without time zone";

@ObjectType()
export abstract class BaseColumn {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @Field()
  public id: string;

  @Column({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" })
  @CreateDateColumn({ type: TIMESTAMP_TYPE })
  @IsDate()
  @Field()
  public createdAt: Date;

  @Column({ type: TIMESTAMP_TYPE, default: () => "CURRENT_TIMESTAMP" })
  @UpdateDateColumn({ type: TIMESTAMP_TYPE })
  @IsDate()
  @Field()
  public updatedAt: Date;

  @Column({ default: false })
  @Field()
  public isDeleted: boolean;
}

export const RELATION_WITH = (relations: string[]) => {
  return { relations: relations };
};
