import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
const rp = require('request-promise')
import Ws from '../../services/ws'

Ws.boot()

const client_id= Env.get('ECOBANK_CLIENT_ID');
const client_secret= Env.get('ECOBANK_CLIENT_SECRET');
const base = "https://developer.ecobank.com";

export default class EcobankCardsController {

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

      // by card
      async  cardPayment({request}:HttpContextContract) {
        const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/card`;
        const currency = request.input('currency')
        const amount = request.input('amount')
        // const productCode = request.input('productCode')
        // const locale = request.input('locale')
        // const orderInfo = request.input('orderInfo')
        // const requestId = request.input('requestId')
        const response = await rp(url, {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Origin": "developer.ecobank.com",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }, 
          body: JSON.stringify({
            paymentDetails: {
              requestId: 44, 
              "productCode":"GMT112",
              amount: amount,
              currency: currency,
              "locale": "en_AU",
              "orderInfo": "255s353",
              "returnUrl": "https://16ee-154-125-15-31.eu.ngrok.io"
            },
            merchantDetails: {
              "accessCode": "79742570",
              "merchantID": "ETZ001",
              "secureSecret": "sdsffd"
            },
            "secureHash":"7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855",
          }),
        });

        return JSON.parse(response)
       
      }
      async webHookResponse({request}:HttpContextContract){
        console.log('inwebhook');
        
        var response = request.all()
        //var content = response.resource.status
        console.log(response)
       // Ws.io.emit('message',content) // notification du statut de la transaction
      }

      // Account balance informations

    async  AccountBalance({request}:HttpContextContract) {
        const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/accountbalance`;
        const affiliateCode = request.input('affiliateCode')
        const accountNo = request.input('accountNo')
        const companyName = request.input('companyName')
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
            "affiliateCode": affiliateCode,
            "accountNo": accountNo,
            "clientId": client_id,
            "companyName": companyName,
            "secureHash": "ab7fd06c906c0601cda2c5679b94474ef6968132500c61f80f7606f307ef6f47917cd650a01633d512d2a64d7e130cf640eb1164a7aeef637d5ee4f802f04005"
          }),
        });

        return JSON.parse(response)
       
      }
     

    
}
