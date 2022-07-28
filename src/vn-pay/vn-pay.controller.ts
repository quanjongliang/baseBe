import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Redirect } from '@nestjs/common';
import { CreateVnPayDto, UpdateVnPayDto } from './dto';
import { VnPayService } from './vn-pay.service';
import {Response} from 'express'
@Controller('vn-pay')
export class VnPayController {
  constructor(private readonly vnPayService: VnPayService) {}

  @Post()
  create(@Body() createVnPayDto: CreateVnPayDto , @Res() res: Response) {
    return this.vnPayService.create(createVnPayDto,res);
  }

  @Get()
  findAll() {
    return this.vnPayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vnPayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVnPayDto: UpdateVnPayDto) {
    return this.vnPayService.update(+id, updateVnPayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vnPayService.remove(+id);
  }
}
