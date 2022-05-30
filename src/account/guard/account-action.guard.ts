import { ACCOUNT_MESSAGE, HISTORY_MESSAGE } from "@/core";
import { ACCOUNT_RELATION } from "@/entity";
import { AccountRepository } from "@/repository";
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AccountActionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountRepository: AccountRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    if (id) {
      const account = await this.accountRepository.checkExistAccount(id);
      request.account = account;
      return true;
    }
    throw new BadRequestException(HISTORY_MESSAGE.NOT_FOUND);
  }
}
