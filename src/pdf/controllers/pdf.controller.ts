import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PdfService } from '../services';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}


}
