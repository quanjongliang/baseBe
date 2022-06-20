import { Drive } from "@/entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Drive)
export class DriveReposiotry extends Repository<Drive> {}
