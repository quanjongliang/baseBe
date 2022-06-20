import { CloundinaryService } from "@/cloudinary";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class UploadFileInterceptor implements NestInterceptor {
  constructor(protected cloundinaryService: CloundinaryService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    console.log("Uplioadinggg");
    return next.handle().pipe(
      map(() => {
        console.log("Hello");
      })
    );
  }
}
