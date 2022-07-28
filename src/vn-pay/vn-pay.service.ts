import { LanguageCode } from '@/entity';
import { VnPayRepository } from '@/repository';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { getCreatedDateAndOrderId, sortObject, VNP_COMMAND, VNP_VERSION } from './common';
import { CreateVnPayDto, VnpParams, VnpParamsWithoutHash } from './dto/create-vn-pay.dto';
import { UpdateVnPayDto } from './dto/update-vn-pay.dto';
import * as queryString from 'qs'
import * as crypto from 'crypto'
@Injectable()
export class VnPayService {
  constructor(
    private connection: Connection,
    private vnPayRepository: VnPayRepository
  ){}
  async create(createVnPayDto: CreateVnPayDto,res:Response) {
    return this.connection.transaction(async()=>{
      const {amount,bankCode,ip,orderDescription,orderType,language} = createVnPayDto
      const tmnCode = process.env.VNP_TMNCODE
      const secretKey = process.env.VNP_HASH_SECRET
      const vnpUrl = process.env.VNP_URL
      const returnUrl = process.env.VNP_RETURN_URL
      const {createDate,orderId} = getCreatedDateAndOrderId()
      const vnpParamsObject:VnpParamsWithoutHash={
          vnp_Amount: amount*100,
          vnp_Version: VNP_VERSION,
          vnp_Command:VNP_COMMAND,
          vnp_Locale:language|| LanguageCode.VN,
          vnp_BankCode: bankCode,
          vnp_TxnRef:orderId,
          vnp_CreateDate:createDate,
          vnp_CurrCode:'VND',
          vnp_IpAddr:ip,
          vnp_OrderInfo:orderDescription,
          vnp_OrderType:orderType,
          vnp_ReturnUrl:returnUrl,
          vnp_TmnCode:tmnCode,
      }
      const sortedParams = sortObject(vnpParamsObject)
      const signData = queryString.stringify(sortedParams,{encode:false})
      const hmac = crypto.createHmac("sha512", secretKey);
      const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");      
      const vnp_Params = {
        ...sortedParams,
        vnp_SecureHash: signed
      }
      const redirectVnpUrl = vnpUrl + '?' + queryString.stringify(vnp_Params, { encode: false });
      return res.redirect(redirectVnpUrl)
    })
  }

  findAll() {
    return `This action returns all vnPay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vnPay`;
  }

  update(id: number, updateVnPayDto: UpdateVnPayDto) {
    return `This action updates a #${id} vnPay`;
  }

  remove(id: number) {
    return `This action removes a #${id} vnPay`;
  }
}
