import { Column, Entity } from "typeorm";
import { BaseColumn } from "../base";

export const VNPAY_TABLE_NAME ='vn-pay'

export enum BankCode{
    VNPAYQR='VNPAYQR',
    NCB='NCB',
    SCB='SCB',
    SACOMBANK='SACOMBANK',
    EXIMBANK='EXIMBANK',
    MSBANK='MSBANK',
    NAMABANK='NAMABANK',
    VISA='VISA',
    VNMART='VNMART',
    VIETINBANK='VIETINBANK',
    VIETCOMBANK='VIETCOMBANK',
    HDBANK='HDBANK',
    DONGABANK='DONGABANK',
    TPBANK='TPBANK',
    OJB='OJB',
    BIDV='BIDV',
    TECHCOMBANK='TECHCOMBANK',
    VPBANK='VPBANK',
    AGRIBANK='AGRIBANK',
    MBBANK='MBBANK',
    ACB='ACB',
    OCB='OCB',
    SHB='SHB',
    IVB='IVB'
}
export enum LanguageCode{
    VN='vn',
    EN='en'
}

export enum OrderType{
    TOPUP='topup',
    BILLPAYMENT='billpayment',
    FASHION='fashion'
}

@Entity(VNPAY_TABLE_NAME)
export class VnPay extends BaseColumn{
    @Column({unique:true})
    orderId:string
    @Column({type:'text'})
    vnp_Command:string
    @Column({type:'text'})
    vnp_TmnCode:string
    @Column({enum:LanguageCode,default:LanguageCode.VN})
    vnp_Locale:LanguageCode
    @Column({type:'text'})
    vnp_Version:string
    @Column({type:'text'})
    vnp_TxnRef:string
    @Column({type:'text'})
    vnp_CurrCode:string
    @Column({type:'text'})
    vnp_OrderInfo:string
    @Column({type:'text'})
    vnp_OrderType:string
    @Column({type:'integer'})
    vnp_Amount:number
    @Column({type:'text'})
    vnp_ReturnUrl:string
    @Column({type:'text'})
    vnp_IpAddr:string
    @Column({type:'text'})
    vnp_CreateDate:string
    @Column({enum:BankCode})
    vnp_BankCode:BankCode
    }
