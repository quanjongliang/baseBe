import { VnpCreateDateAndOrderId, VnpParams, VnpParamsWithoutHash } from "../dto";
import * as dateFns from 'date-fns'
export const VNP_VERSION='2.1.0'
export const VNP_COMMAND='pay'

export const getCreatedDateAndOrderId= ():VnpCreateDateAndOrderId=>{
	const date = new Date()
	return {
		createDate: dateFns.format(date,'yyyymmddHHmmss'),
		orderId: dateFns.format(date,'HHmmss')
	}
}

export const sortObject= (obj:VnpParamsWithoutHash) =>{
	const sorted = {};
	const str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}