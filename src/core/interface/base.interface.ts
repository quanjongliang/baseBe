import { HttpStatus } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

export enum ORDER {
  ASC = "ASC",
  DESC = "DESC",
}

export class BaseQuery {
  @ApiPropertyOptional()
  @IsOptional()
  limit?: number;
  @IsOptional()
  @ApiPropertyOptional()
  offset?: number;
}

export class BaseQueryResponse<T> {
  data: T[];
  total: number;
}

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: ORDER, default: ORDER.ASC })
  @IsEnum(ORDER)
  @IsOptional()
  readonly order?: ORDER;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly sortColumn: string = "id";

  @ApiPropertyOptional()
  @IsOptional()
  readonly query: string = "";

  get skip(): number {
    return (this.page - 1) * this.take || 0;
  }
}
