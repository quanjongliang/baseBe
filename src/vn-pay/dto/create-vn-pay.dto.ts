import { BankCode, LanguageCode, OrderType } from "@/entity"
import { HttpStatus } from "@nestjs/common"

export class CreateVnPayDto {
    orderDescription:string
    orderType : OrderType
    bankCode: BankCode
    amount:number
    ip:string
    language?: LanguageCode
}

export interface RedirectInterface{
    url:string
    code: HttpStatus
}

export class VnpParamsWithoutHash {
    vnp_Version:string
    vnp_Command:string
    vnp_TmnCode:string
    vnp_Locale:LanguageCode
    vnp_TxnRef:string
    vnp_CurrCode:string
    vnp_OrderInfo:string
    vnp_OrderType:string
    vnp_Amount:number
    vnp_ReturnUrl:string
    vnp_IpAddr:string
    vnp_CreateDate:string
    vnp_BankCode:BankCode
}
export class VnpParams extends VnpParamsWithoutHash {
    vnp_SecureHash:string
}

export class VnpCreateDateAndOrderId{
    createDate:string
    orderId:string
}