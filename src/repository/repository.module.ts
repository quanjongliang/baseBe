import { TypeOrmModule } from "@nestjs/typeorm";
import { Cloundinary, Drive, User, VnPay } from "@/entity";
import { Module } from "@nestjs/common";
import { UserRepository } from "./user";
import { CloundinaryReposiotry } from "./cloudinary";
import { DriveReposiotry } from "./drive";
import { VnPayRepository } from "./vn-pay";
const ENTITY_LIST = [User, Cloundinary, Drive,VnPay];
const REPOSITORY_LIST = [
  UserRepository,
  CloundinaryReposiotry,
  DriveReposiotry,
  VnPayRepository
];

@Module({
  imports: [TypeOrmModule.forFeature([...ENTITY_LIST, ...REPOSITORY_LIST])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
