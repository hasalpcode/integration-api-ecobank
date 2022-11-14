import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
const rp = require('request-promise')
//const QRCode = require('qrcode')
import Ws from '../../services/ws'
Ws.boot()
const client_id= Env.get('ECOBANK_CLIENT_ID');
const client_secret= Env.get('ECOBANK_CLIENT_SECRET');
const base = "https://developer.ecobank.com";

export default class EcobankOtherDealsController {

    async getToken() { 
      
        const result = await rp(`${base}/corporateapi/user/token`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Origin: 'developer.ecobank.com'
            
          },
          body: JSON.stringify({
            userId: client_id,
            password: '$2a$10$Wmame'+client_secret
          }),
          
        }).then((res)=>{
          
          return res
        })
        
      
      return (JSON.parse(result).token)
    }
    // get biller list

    async  GetBillerList({request}:HttpContextContract) {
      //const accessToken = await this.getToken();
      const url = `${base}/corporateapi/merchant/getbillerlist`;
      const affiliateCode = request.input('affiliateCode')
      

      const response = await rp(url, {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Origin": "developer.ecobank.com",
          "Content-Type": "application/json",
          //Authorization: `Bearer ${accessToken}`,
        }, 
       
        body: JSON.stringify({
          "requestId": "ECO2112134345",
          "affiliateCode": affiliateCode,
          "secureHash": "77f689d330dfe3b0797a53962b549b441777454432f00a94607195d8e56800a4e4d644ca96b443a98bfcf25e91f1bcb1971b09a74473646211033fa7324573a3"
      
        }),
      });
      console.log(affiliateCode)
      return response
    
  }
    // bills payment
    async  BillPayment({request}:HttpContextContract) {
        //const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/payment`;
        const firstname = request.input('firstname')
        const lastname = request.input('lastname')
        const amount = request.input('amount')
        const phone = request.input('phone')
        const email = request.input('email')
        const billercode = request.input('billercode')
        const billerRef = request.input('billRefNo')
        const billerAmount = request.input('amount')
        const customername = request.input('customerName')
        const customerRef = request.input('customerRefNo')
        const currency = request.input('currency')

        const response = await rp(url, {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Origin": "developer.ecobank.com",
            "Content-Type": "application/json",
            //Authorization: `Bearer ${accessToken}`,
          },
         
          body: JSON.stringify({
            "paymentHeader": {
                "clientid": "EGHTelc000043",
                "batchsequence": "1",
                "batchamount": billerAmount,
                "transactionamount": billerAmount,
                "batchid": "EG1593490",
                "transactioncount": 4,
                "batchcount": 4,
                "transactionid": "E12T443308",
                "debittype": "Multiple",
                "affiliateCode": "EGH",
                "totalbatches": "1",
                "execution_date": "2020-06-01 00:00:00"
            },
            
            "extension": [
                {
                    "request_id": "ECI55096987905",
                    "request_type": "BILLPAYMENT",
                    "param_list": "[{\"key\":\"billerCode\", \"value\":"+billercode+"},{\"key\":\"billRefNo\", \"value\":"+billerRef+"},{\"key\":\"cbaRefNo\", \"value\":\"\"},{\"key\":\"customerName\", \"value\":"+customername+"},{\"key\":\"customerRefNo\", \"value\":"+customerRef+"},{\"key\":\"productCode\", \"value\":\"PassBio\"},{\"key\":\"formDataValue\", \"value\":\"[{\\\"fieldName\\\":\\\"LastName\\\",\\\"fieldValue\\\":"+lastname+"},{\\\"fieldName\\\":\\\"FirstName\\\",\\\"fieldValue\\\":"+firstname+"},{\\\"fieldName\\\":\\\"Amount\\\",\\\"fieldValue\\\":"+amount+"},{\\\"fieldName\\\":\\\"Phone\\\",\\\"fieldValue\\\":"+phone+"},{\\\"fieldName\\\":\\\"Email\\\",\\\"fieldValue\\\":"+email+"},{\\\"fieldName\\\":\\\"reference\\\",\\\"fieldValue\\\":\\\"210120400582\\\"}]\"}]",
                    "amount": billerAmount,
                    "currency": currency,
                    "status": "",
                    "rate_type": "spot"
                }
            ],
            "secureHash":"7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855"

            }),
        });
        console.log(lastname)
        return JSON.parse(response)
       
    }
    // interbank payment
    async  InterbankPayment({request}:HttpContextContract) {
        //const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/payment`;
        const destinationBankCode = request.input('destinationbank')
        const senderName = request.input('sendername')
        const senderAddress = request.input('senderadresse')
        const senderPhone = request.input('senderphone')
        const beneficiaryAccountNo = request.input('benefaccountno')
        const beneficiaryName = request.input('beneficiaryName')
        const beneficiaryPhone = request.input('beneficiaryPhone')
        const amount = request.input('amount')
        const currency = request.input('currency')

        const response = await rp(url, {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Origin": "developer.ecobank.com",
            "Content-Type": "application/json",
            //Authorization: `Bearer ${accessToken}`,
          },
         
          body: JSON.stringify({
            "paymentHeader": {
                "clientid": "EGHTelc000043",
                "batchsequence": "1",
                "batchamount": 270,
                "transactionamount": 270,
                "batchid": "EG1593490",
                "transactioncount": 4,
                "batchcount": 4,
                "transactionid": "E12T443308",
                "debittype": "Multiple",
                "affiliateCode": "EGH",
                "totalbatches": "1",
                "execution_date": "2020-06-01 00:00:00"
            },
            
            "extension": [
                {
                    "request_id": "2325",
                    "request_type": "INTERBANK",
                    "param_list": "[{\"key\":\"destinationBankCode\", \"value\":"+destinationBankCode+"},{\"key\":\"senderName\", \"value\":"+senderName+"},{\"key\":\"senderAddress\", \"value\":"+senderAddress+"},{\"key\":\"senderPhone\", \"value\":"+senderPhone+"},{\"key\":\"beneficiaryAccountNo\",\"value\":"+beneficiaryAccountNo+"},{\"key\":\"beneficiaryName\", \"value\":"+beneficiaryName+"},{\"key\":\"beneficiaryPhone\", \"value\":"+beneficiaryPhone+"},{\"key\":\"transferReferenceNo\", \"value\":\"QWE345Y4\"},{\"key\":\"amount\", \"value\":"+amount+"},{\"key\":\"ccy\", \"value\":"+currency+"},{\"key\":\"transferType\", \"value\":\"spot\"}]",
                    "amount": amount,
                    "currency": currency,
                    "status": "",
                    "rate_type": "spot"
                }
            ],
            "secureHash":"7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855"

            }),
        });
        console.log(destinationBankCode)
        return JSON.parse(response)
       
    }

    // domestic payment
    async  DomesticPayment({request}:HttpContextContract) {
        //const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/payment`;
        const creditAccountNo = request.input('creditAccountNo')
        const debitAccountBranch = request.input('debitAccountBranch')
        const debitAccountType = request.input('debitAccountType')
        const creditAccountBranch = request.input('creditAccountBranch')
        const creditAccountType = request.input('creditAccountType')
        const amount = request.input('amount')
        const currency = request.input('currency')

        const response = await rp(url, {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Origin": "developer.ecobank.com",
            "Content-Type": "application/json",
            //Authorization: `Bearer ${accessToken}`,
          },
         
          body: JSON.stringify({
            "paymentHeader": {
                "clientid": "EGHTelc000043",
                "batchsequence": "1",
                "batchamount": 270,
                "transactionamount": 270,
                "batchid": "EG1593490",
                "transactioncount": 4,
                "batchcount": 4,
                "transactionid": "E12T443308",
                "debittype": "Multiple",
                "affiliateCode": "EGH",
                "totalbatches": "1",
                "execution_date": "2020-06-01 00:00:00"
            },
            
            "extension": [
                {
                    "request_id": "2323",
                    "request_type": "domestic",
                    "param_list": "[{\"key\":\"creditAccountNo\", \"value\":"+creditAccountNo+"},{\"key\":\"debitAccountBranch\", \"value\":"+debitAccountBranch+"},{\"key\":\"debitAccountType\", \"value\":"+debitAccountType+"},{\"key\":\"creditAccountBranch\", "+creditAccountBranch+"},{\"key\":\"creditAccountType\", \"value\":"+creditAccountType+"},{\"key\":\"amount\", \"value\":"+amount+"},{\"key\":\"ccy\", \"value\":"+currency+"}]",
                    "amount": 50,
                    "currency": "GHS",
                    "status": "",
                    "rate_type": "spot"
                }
            ],
            "secureHash":"7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855"

            }),
        });
        console.log(amount)
        return JSON.parse(response)
       
    }
    // jeton payment
    async  JetonPayment({request}:HttpContextContract) {
        //const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/payment`;
        const transactionDescription = request.input('transactionDescription')
        const secretCode = request.input('secretCode')
        const sourceAccount = request.input('sourceAccount')
        const sourceAccountType = request.input('sourceAccountType')
        const senderName = request.input('senderName')
        const senderMobileNo = request.input('senderMobileNo')
        const beneficiaryName = request.input('beneficiaryName')
        const beneficiaryMobileNo = request.input('beneficiaryMobileNo')
        const amount = request.input('amount')
        const currency = request.input('currency')

        const response = await rp(url, {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Origin": "developer.ecobank.com",
            "Content-Type": "application/json",
            //Authorization: `Bearer ${accessToken}`,
          },
         
          body: JSON.stringify({
            "paymentHeader": {
                "clientid": "EGHTelc000043",
                "batchsequence": "1",
                "batchamount": 270,
                "transactionamount": 270,
                "batchid": "EG1593490",
                "transactioncount": 4,
                "batchcount": 4,
                "transactionid": "E12T443308",
                "debittype": "Multiple",
                "affiliateCode": "EGH",
                "totalbatches": "1",
                "execution_date": "2020-06-01 00:00:00"
            }, 
            
            "extension": [
                {
                    "request_id": "432",
                    "request_type": "token",
                    "param_list": "[{\"key\":\"transactionDescription\", \"value\":"+transactionDescription+"},{\"key\":\"secretCode\", \"value\":"+secretCode+"},{\"key\":\"sourceAccount\",\"value\":"+sourceAccount+"},{\"key\":\"sourceAccountCurrency\", "+currency+"},{\"key\":\"sourceAccountType\", \"value\":"+sourceAccountType+"},{\"key\":\"senderName\", \"value\":"+senderName+"},{\"key\":\"ccy\", \"value\":"+currency+"},{\"key\":\"senderMobileNo\", \"value\":"+senderMobileNo+",{\"key\":\"amount\", \"value\":"+amount+",{\"key\":\"senderId\", \"value\":\"QWE345Y4\"},{\"key\":\"beneficiaryName\", \"value\":"+beneficiaryName+"},{\"key\":\"beneficiaryMobileNo\", \"value\":"+beneficiaryMobileNo+"},{\"key\":\"withdrawalChannel\", \"value\":\"ATM\"}]",
                    "amount": 50,
                    "currency": "GHS",
                    "status": "", 
                    "rate_type": "spot"
                }
            ],
            "secureHash":"7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0ne9855"

            }),
        });
        console.log(senderName)
        return response
       
    }

    // MOMO payment
    
    async  MomoPayment({request}:HttpContextContract) {
        const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/momo`;
        const countryCode = request.input('countryCode')
        const senderName = request.input('senderName')
        const senderAccountNo = request.input('senderAccountNo')
        const senderPhoneNumber = request.input('senderPhoneNumber')
        const receiverPhoneNumber = request.input('receiverPhoneNumber')
        const receiverFirstName = request.input('receiverFirstName')
        const receiverLastName = request.input('receiverLastName')
        const receiverEmail = request.input('receiverEmail')
        const amount = request.input('amount')
        const currency = request.input('currency')

        const response = await rp(url, {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Origin": "developer.ecobank.com",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
         
          body: JSON.stringify({
            "affiliateCode": "EGH",
            "telco": "MTN",
            "channel": "UNIFIED",
            "token": "SBRC/3MJMGmz1WuHiRpmikk6SWgBj/Tt",
            "content": {
            "countryCode": countryCode,
            "transId": "1ER9P00OT",
            "productCode":"1132",
            "senderName": senderName,
            "senderAccountNo": senderAccountNo,
            "senderPhoneNumber": senderPhoneNumber,
            "branch": "001",
            "transRef": "REF671700057",
            "bankref": "REF6798238",
            "receiverPhoneNumber":receiverPhoneNumber,
            "receiverFirstName": receiverFirstName,
            "receiverLastName": receiverLastName,
            "receiverEmail": receiverEmail,
            "receiverBank": "6762482201037786",
            "currency": currency,
            "amount": amount,
            "transDesc": "Wallet Trans",
            "transType": "pull"
    },
    "secureHash": "7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855"
            }),
        });
        //console.log(senderName)
        return response
       
    }
}
