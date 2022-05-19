import { Query, Controller, Get, UseInterceptors, Body } from "@nestjs/common";
import { QueryAccountByTagDto, QueryAccountDto } from "../dto";
import { AccountService } from "../service";
import { ApiTags } from "@nestjs/swagger";
import { GetAccountInterceptor } from "../interceptor";
@Controller("account-get")
@ApiTags("account-get")
export class AccountGetController {
  constructor(private accountService: AccountService) {}

  @Get()
  @UseInterceptors(GetAccountInterceptor)
  queryAccount(@Query() queryAccountDto: QueryAccountDto) {
    return this.accountService.queryAccount(queryAccountDto);
  }

  @Get("tags")
  queryAccountByTag(@Query() queryAccountTag: QueryAccountByTagDto) {
    return this.accountService.queryAccountByTag(queryAccountTag);
  }
}
