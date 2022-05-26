import { CurrentUser, JwtAuthGuard, Roles, RolesGuard } from "@/auth";
import { MOD_ADMIN_ROLE } from "@/core";
import { User } from "@/entity";
import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Patch,
  UseInterceptors,
  Param,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateAuditByAdminDto, CreateAuditDto, QueryAuditDto } from "../dto";
import { GetAuditInterceptor } from "../interceptor";
import { AuditService } from "../service";

@Controller("audit")
@ApiTags("audit")
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Post()
  async createNewAudit(
    @CurrentUser() user: User,
    @Body() createAuditDto: CreateAuditDto
  ) {
    return this.auditService.createNewAudit(user, createAuditDto);
  }

  @Post("create")
  @Roles(...MOD_ADMIN_ROLE)
  async createAuditByAdmin(
    @CurrentUser() user: User,
    @Body() createAuditByAdmin: CreateAuditByAdminDto
  ) {
    return this.auditService.createAuditByAdmin(user, createAuditByAdmin);
  }

  @Get()
  @UseInterceptors(GetAuditInterceptor)
  async getAuditHistory(
    @CurrentUser() user: User,
    @Query() queryAuditDto: QueryAuditDto
  ) {
    return this.auditService.queryAuditByUser(queryAuditDto, user);
  }

  @Get("all")
  @Roles(...MOD_ADMIN_ROLE)
  @UseInterceptors(GetAuditInterceptor)
  async getAllAuditHistory(@Query() queryAuditDto: QueryAuditDto) {
    return this.auditService.queryAuditByUser(queryAuditDto);
  }

  @Patch("update/:id")
  @UseGuards(RolesGuard)
  @Roles(...MOD_ADMIN_ROLE)
  async updateStatusAudit(@CurrentUser() user: User, @Param("id") id: string) {
    return this.auditService.updateStatusAudit(user, id);
  }
}
