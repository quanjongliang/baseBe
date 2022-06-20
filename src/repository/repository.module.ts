import { TypeOrmModule } from "@nestjs/typeorm";
import { Cloundinary, Drive, User } from "@/entity";
import { Module } from "@nestjs/common";
import { UserRepository } from "./user";
import { CloundinaryReposiotry } from "./cloudinary";
import { DriveReposiotry } from "./drive";
const ENTITY_LIST = [User, Cloundinary, Drive];
const REPOSITORY_LIST = [
  UserRepository,
  CloundinaryReposiotry,
  DriveReposiotry,
];

@Module({
  imports: [TypeOrmModule.forFeature([...ENTITY_LIST, ...REPOSITORY_LIST])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
