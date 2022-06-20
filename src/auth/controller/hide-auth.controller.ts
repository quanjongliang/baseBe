import { PageOptionsDto } from "@/core";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../service";

@Controller("hide-auth")
@ApiTags("hide-auth")
export class HideAuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async getAllUser() {
    return this.authService.getAllUser();
  }

  @Get("list-user")
  async getAllUserList(@Query() queryUserDto: PageOptionsDto) {
    return this.authService.getAllUserList(queryUserDto);
  }
}
