import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
const rp = require('request-promise')
//const QRCode = require('qrcode')
import Ws from '../../services/ws'

Ws.boot()
const client_id= Env.get('ECOBANK_CLIENT_ID');
const client_secret= Env.get('ECOBANK_CLIENT_SECRET');
const base = "https://developer.ecobank.com";

export default class EcobankQrsController {

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

     // merchant qr creation
     async  merchantQr() {
        const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/createqr`;
  
        const response = await rp(url, {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Origin": "developer.ecobank.com",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
         
          body: JSON.stringify({
            "headerRequest": {
              "requestId": "",
              "affiliateCode": "EGH",
              "requestToken": "/4mZF42iofzo7BDu0YtbwY6swLwk46Z91xItybhYwQGFpaZNOpsznL/9fca5LkeV",
              "sourceCode": "ECOBANK_QR_API",
              "sourceChannelId": "KANZAN",
              "requestType":"CREATE_MERCHANT"
            },
            
            "merchantAddress": "123ERT",
            "merchantName":"insoft sa",
            "accountNumber": "02002233444",
            "terminalName": "INSOFT SA",
            "mobileNumber": "0245293945",
            "email": "freemanst@gmail.com",
            "area": "Ridge",
            "city": "Ridge",
            "referralCode": "123456",
            "mcc": "4209",
            "dynamicQr":"Y",
            "callBackUrl":"http://koala.php",
            "secure_hash":"7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855"
            }),
        });
        console.log(JSON.parse(response).response_content.terminalId)
        return JSON.parse(response).response_content.terminalId
       
    }
    // generer le qr code

    async  dynamicQrPayment({request}:HttpContextContract) {
    //const accessToken = await this.getToken();
    const terminalId = await this.merchantQr()
    const url = `${base}/corporateapi/merchant/qr`;
    const currency = request.input('currency2')
    const amount = request.input('amount2')
    const response = await rp(url, {
        method: "post",
        headers: {
        "Accept": "application/json",
        "Origin": "developer.ecobank.com",
        "Content-Type": "application/json",
        
        },
        
        body: JSON.stringify({
          "ec_terminal_id": terminalId,
          "ec_transaction_id": "we2209",
          "ec_amount": amount,
          "ec_charges": "0",
          "ec_fees_type": "P",
          "ec_ccy": currency,
          "ec_payment_method": "QR",
          "ec_customer_id": "OK1337/09",
          "ec_customer_name": "DAVID AMUQUANDOH",
          "ec_mobile_no": "233260516997",
          "ec_email": "DAVYTHIT@GMAIL.COM",
          "ec_payment_description": "PAYMENT FOR JUMIA SHOPPING",
          "ec_product_code": "AEW23FSSS",
          "ec_product_name": "ONLINE SHOPPING 1212",
          "ec_transaction_date": "bnbbn",
          "ec_affiliate": "qwe123QE",
          "ec_country_code": "123",
          "secure_hash": "7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855"
        }),
    });
    return JSON.parse(response)

    }

    // Get account enquiry // obtenir une demande de compte

    async  AccountEnquiry({request}:HttpContextContract) {
      const accessToken = await this.getToken();
      const url = `${base}/corporateapi/merchant/accountinquiry`;
      const account = request.input('accountNo')
      const id_client = request.input('clientId')
      const response = await rp(url, {
          method: "post",
          headers: {
          "Accept": "application/json",
          "Origin": "developer.ecobank.com",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          },
        
          body: JSON.stringify({
            "requestId": "14232436312", 
            "affiliateCode": "EGH",
            "accountNo": account,
            "clientId": id_client,
            
            "secureHash": "2a58ca499561e941d9196999a1ed253161a47c98466d06ecaa02eb52a3b02261a03cbae9f5fdc0a3efe7b1f941764ff661cb1de24c8aa5029ecef6a1feb3efae" 
          }),
      });
      return JSON.parse(response)

    }
}
