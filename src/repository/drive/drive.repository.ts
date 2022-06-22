import { Drive } from "@/entity";
import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Drive)
export class DriveReposiotry extends Repository<Drive> {
  async findOneIfExist(id: string): Promise<Drive> {
    const drive = await this.findOne({ id });
    if (!drive) throw new NotFoundException(`Drive id: ${id} not found`);
    return drive;
  }
}
