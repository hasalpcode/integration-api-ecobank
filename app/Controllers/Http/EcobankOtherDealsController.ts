import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Env from '@ioc:Adonis/Core/Env'
const rp = require('request-promise')
//const QRCode = require('qrcode')
import Ws from '../../services/ws'

Ws.boot()
//const client_id= Env.get('ECOBANK_CLIENT_ID');
//const client_secret= Env.get('ECOBANK_CLIENT_SECRET');
const base = "https://developer.ecobank.com";

export default class EcobankOtherDealsController {

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

}
