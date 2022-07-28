import { PartialType } from '@nestjs/swagger';
import { CreateVnPayDto } from './create-vn-pay.dto';

export class UpdateVnPayDto extends PartialType(CreateVnPayDto) {}
