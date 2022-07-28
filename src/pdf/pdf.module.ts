import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PdfController } from "./controllers";
import { PdfService } from "./services";

const providers = [PdfService];
@Module({
  imports: [HttpModule],
  controllers: [PdfController],
  providers,
  exports: providers,
})
export class PdfModule {}
