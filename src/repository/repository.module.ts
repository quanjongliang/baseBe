import { TypeOrmModule } from "@nestjs/typeorm";
import { Cloundinary, User } from "@/entity";
import { Module } from "@nestjs/common";
import { UserRepository } from "./user";
import { CloundinaryReposiotry } from "./cloudinary";
const ENTITY_LIST = [User, Cloundinary];
const REPOSITORY_LIST = [UserRepository, CloundinaryReposiotry];

@Module({
  imports: [TypeOrmModule.forFeature([...ENTITY_LIST, ...REPOSITORY_LIST])],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
